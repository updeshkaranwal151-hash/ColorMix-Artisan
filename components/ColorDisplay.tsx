import React from 'react';
import type { ColorData } from '../types';

interface ColorDisplayProps {
    colorData: ColorData;
}

const ColorDisplay: React.FC<ColorDisplayProps> = ({ colorData }) => {
    const { colorName, hexCode, rgb } = colorData;
    const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

    return (
        <div className="bg-gray-900/50 rounded-xl shadow-2xl overflow-hidden border border-gray-800">
            <div
                className="w-full h-64 transition-colors duration-500"
                style={{ backgroundColor: hexCode }}
                aria-label={`Color swatch for ${colorName}`}
            ></div>
            <div className="p-6 md:p-8">
                <h3 className="text-5xl font-serif font-bold text-white leading-tight">{colorName}</h3>
                <div className="mt-4 flex items-center space-x-6 text-gray-400 font-mono text-sm">
                    <span className="bg-gray-800 px-2 py-1 rounded">{hexCode.toUpperCase()}</span>
                    <span className="bg-gray-800 px-2 py-1 rounded">{rgbString}</span>
                </div>
            </div>
        </div>
    );
};

export default ColorDisplay;