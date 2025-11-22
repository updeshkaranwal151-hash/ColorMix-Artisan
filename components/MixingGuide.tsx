import React from 'react';

interface MixingGuideProps {
    guide: string[];
}

const PaintBrushIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.998 15.998 0 011.622-3.385m5.043.025a15.998 15.998 0 001.622-3.385m3.388 1.62a15.998 15.998 0 00-1.62-3.385m0 0a3 3 0 00-5.78-1.128 2.25 2.25 0 01-2.4-2.245 4.5 4.5 0 008.4 2.245c0 .399-.078.78-.22 1.128zm0 0a15.998 15.998 0 00-3.388 1.62m5.043-.025a15.998 15.998 0 01-1.622 3.385m-5.043.025a15.998 15.998 0 00-1.622 3.385m-3.388-1.62a15.998 15.998 0 001.62 3.385m0 0a3 3 0 005.78 1.128 2.25 2.25 0 012.4 2.245 4.5 4.5 0 00-8.4-2.245c0-.399.078-.78.22-1.128z" />
    </svg>
);

const MixingGuide: React.FC<MixingGuideProps> = ({ guide }) => {
    if (!guide || guide.length === 0) {
        return null;
    }
    
    return (
        <div className="p-6 md:p-8 bg-gray-900/50 rounded-xl shadow-2xl border border-gray-800">
            <h3 className="text-2xl font-serif font-bold text-teal-400 mb-6 flex items-center">
                <PaintBrushIcon className="w-6 h-6 mr-3"/>
                Mixing Guide
            </h3>
            <div className="relative pl-10">
                 <div className="absolute left-4 top-1 bottom-1 w-0.5 bg-gray-700 rounded-full"></div>
                {guide.map((step, index) => (
                    <div key={index} className="relative mb-6">
                        <div className="absolute -left-6 top-1.5 flex-shrink-0 flex items-center justify-center w-8 h-8 bg-gray-700 text-teal-400 font-bold rounded-full border-2 border-gray-900">
                            {index + 1}
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                            {step}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MixingGuide;