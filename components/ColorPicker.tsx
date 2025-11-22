import React, { useState, useEffect } from 'react';

interface ColorPickerProps {
    color: string;
    onChange: (color: string) => void;
    isLoading: boolean;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange, isLoading }) => {
    const [inputValue, setInputValue] = useState(color);

    useEffect(() => {
        setInputValue(color);
    }, [color]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputBlur = () => {
        if (/^#[0-9A-F]{6}$/i.test(inputValue)) {
            if(inputValue.toLowerCase() !== color.toLowerCase()) {
                onChange(inputValue);
            }
        } else {
            setInputValue(color);
        }
    };
    
    const handleColorTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newColor = e.target.value;
        setInputValue(newColor);
        onChange(newColor);
    };


    return (
        <div className="p-6 bg-gray-900/50 rounded-xl shadow-2xl space-y-4 border border-gray-800">
            <div className="flex items-center space-x-4">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-700 shadow-md">
                    <div className="absolute inset-0" style={{ backgroundColor: color }}></div>
                    <input
                        type="color"
                        value={color}
                        onChange={handleColorTypeChange}
                        disabled={isLoading}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        aria-label="Color Picker"
                    />
                </div>
                <div className="flex-1">
                    <label htmlFor="hex-input" className="block text-sm font-medium text-gray-400 mb-1">
                        HEX Code
                    </label>
                    <input
                        id="hex-input"
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }}
                        disabled={isLoading}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white font-mono tracking-wider focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition shadow-inner"
                        placeholder="#RRGGBB"
                    />
                </div>
            </div>
            <p className="text-sm text-gray-500 pt-2">
                Click the swatch or enter a HEX code. The AI will provide mixing instructions.
            </p>
        </div>
    );
};

export default ColorPicker;