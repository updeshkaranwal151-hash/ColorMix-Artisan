import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-8 bg-gray-900/50 rounded-xl shadow-2xl border border-gray-800">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-2">
            <style>{`
                @keyframes pulse-dot {
                    0%, 100% { transform: scale(0.8); opacity: 0.5; }
                    50% { transform: scale(1); opacity: 1; }
                }
                .dot {
                    animation: pulse-dot 1.4s infinite ease-in-out;
                }
                .dot-1 { animation-delay: -0.32s; }
                .dot-2 { animation-delay: -0.16s; }
                .dot-3 { animation-delay: 0s; }
            `}</style>
            <div className="dot dot-1 w-4 h-4 bg-teal-500 rounded-full"></div>
            <div className="dot dot-2 w-4 h-4 bg-teal-500 rounded-full"></div>
            <div className="dot dot-3 w-4 h-4 bg-teal-500 rounded-full"></div>
        </div>
        <p className="text-gray-400 text-lg font-serif">Consulting the color masters...</p>
      </div>
    </div>
  );
};

export default Loader;