import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import ColorPicker from './components/ColorPicker';
import ColorDisplay from './components/ColorDisplay';
import MixingGuide from './components/MixingGuide';
import Loader from './components/Loader';
import ColorLibrary from './components/ColorLibrary';
import SplashScreen from './components/SplashScreen';
import type { ColorData } from './types';
import { getColorDetails, isApiKeySet } from './services/geminiService';

const DEFAULT_COLOR = '#14b8a6'; // Updated default to the new teal accent

const App: React.FC = () => {
    const [showSplash, setShowSplash] = useState<boolean>(true);
    const [selectedColor, setSelectedColor] = useState<string>(DEFAULT_COLOR);
    const [colorData, setColorData] = useState<ColorData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchColorData = useCallback(async (hex: string) => {
        if (!isApiKeySet) {
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const data = await getColorDetails(hex);
            setColorData(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const splashTimer = setTimeout(() => {
            setShowSplash(false);
        }, 3500);

        if (isApiKeySet) {
            fetchColorData(DEFAULT_COLOR);
        } else {
            setIsLoading(false);
        }

        return () => clearTimeout(splashTimer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleColorChange = (newColor: string) => {
        setSelectedColor(newColor);
        fetchColorData(newColor);
    };

    if (showSplash) {
        return <SplashScreen />;
    }
    
    if (!isApiKeySet) {
        return (
             <div className="flex flex-col justify-center items-center min-h-screen text-gray-300 p-4">
                <div className="text-center max-w-lg bg-gray-900/50 border border-gray-700 p-8 rounded-xl shadow-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                    </svg>
                    <h1 className="mt-4 text-2xl font-serif font-bold text-white">Application Configuration Error</h1>
                    <p className="mt-2 text-gray-400">
                        The connection to the creative AI is not set up correctly. The required API key is missing.
                    </p>
                    <p className="mt-4 text-sm text-gray-500">
                        If you are the developer, please ensure the <code>API_KEY</code> environment variable is set in your deployment configuration.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen text-gray-200 animate-fade-in">
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-in-out;
                }
            `}</style>
            <Header />
            <main className="container mx-auto p-4 md:p-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
                    <div className="lg:col-span-2 space-y-8 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-4">
                        <h2 className="text-3xl font-serif font-bold text-teal-400">Create a Color</h2>
                        <ColorPicker color={selectedColor} onChange={handleColorChange} isLoading={isLoading} />
                        <ColorLibrary onColorSelect={handleColorChange} isLoading={isLoading} />
                    </div>

                    <div className="lg:col-span-3 space-y-8">
                        {isLoading && (!colorData || selectedColor !== colorData.hexCode) && <Loader />}
                        {error && (
                            <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg animate-fade-in">
                                <h3 className="font-bold font-serif">Error</h3>
                                <p>{error}</p>
                            </div>
                        )}
                        {colorData && (
                             <div className="space-y-8 animate-fade-in">
                                <ColorDisplay colorData={colorData} />
                                <MixingGuide guide={colorData.mixingGuide} />
                            </div>
                        )}
                    </div>
                </div>
            </main>
             <footer className="text-center p-6 mt-12 border-t border-gray-800 text-gray-500 text-sm">
                <p>Designed & Developed by Apoorv Karanwal for artists and creators.</p>
            </footer>
        </div>
    );
};

export default App;