import React from 'react';
import Logo from './Logo';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/70 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-4 md:px-8">
        <div className="flex items-center space-x-4">
            <Logo className="w-9 h-9 text-teal-500" />
            <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-white">
              ColorMix Artisan
            </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;