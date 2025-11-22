import React from 'react';
import Logo from './Logo';

const SplashScreen: React.FC = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-slate-900 text-slate-200" style={{background: 'radial-gradient(circle, hsl(215, 30%, 15%) 0%, hsl(222, 47%, 11%) 100%)'}}>
             <style>{`
                .splash-logo .circle-outline {
                  stroke-dasharray: 63;
                  stroke-dashoffset: 63;
                  animation: draw-circle 1.5s cubic-bezier(0.5, 1, 0.5, 1) forwards;
                  animation-delay: 0.2s;
                }

                .splash-logo .blob {
                  opacity: 0;
                  transform-origin: center;
                  animation: fill-in 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }

                .splash-title {
                  opacity: 0;
                  animation: fade-in-up 1s ease-out forwards;
                  animation-delay: 2.2s;
                }
            `}</style>
            
            <Logo className="w-24 h-24 text-cyan-400 splash-logo" />

            <h1 className="mt-6 text-3xl md:text-4xl font-bold tracking-tight splash-title">
              <span className="text-shimmer">ColorMix Artisan</span>
            </h1>
        </div>
    );
};

export default SplashScreen;