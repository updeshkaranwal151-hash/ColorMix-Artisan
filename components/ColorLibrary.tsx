import React from 'react';
import { colorLibrary } from '../colorLibraryData';

interface ColorLibraryProps {
    onColorSelect: (color: string) => void;
    isLoading: boolean;
}

const ColorLibrary: React.FC<ColorLibraryProps> = ({ onColorSelect, isLoading }) => {
    return (
        <div className="p-6 bg-gray-900/50 rounded-xl shadow-2xl border border-gray-800">
            <h3 className="text-2xl font-serif font-bold text-teal-400 mb-4">Color Library</h3>
            <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-6 xl:grid-cols-8 gap-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                {colorLibrary.map((color, index) => (
                    <button
                        key={`${color.hex}-${index}`}
                        onClick={() => !isLoading && onColorSelect(color.hex)}
                        disabled={isLoading}
                        className="w-full aspect-square rounded-full cursor-pointer transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-teal-500 disabled:cursor-not-allowed disabled:opacity-50 shadow-md"
                        style={{ backgroundColor: color.hex }}
                        aria-label={color.name}
                        title={color.name}
                    />
                ))}
            </div>
             <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #1f2937; /* gray-800 */
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #4b5563; /* gray-600 */
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #6b7280; /* gray-500 */
                }
            `}</style>
        </div>
    );
};

export default ColorLibrary;