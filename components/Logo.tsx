import React from 'react';

interface LogoProps {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="ColorMix Artisan Logo"
        >
            <path className="circle-outline" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
            <path className="blob" style={{animationDelay: '1.5s'}} d="M6 12C6 11.4477 6.44772 11 7 11H8C8.55228 11 9 11.4477 9 12C9 12.5523 8.55228 13 8 13H7C6.44772 13 6 12.5523 6 12Z" fill="currentColor" opacity="0.6" />
            <path className="blob" style={{animationDelay: '1.7s'}} d="M15 7C15 6.44772 15.4477 6 16 6H17C17.5523 6 18 6.44772 18 7C18 7.55228 17.5523 8 17 8H16C15.4477 8 15 7.55228 15 7Z" fill="currentColor" opacity="0.8"/>
            <path className="blob" style={{animationDelay: '1.9s'}} d="M15 17C15 16.4477 15.4477 16 16 16H17C17.5523 16 18 16.4477 18 17C18 17.5523 17.5523 18 17 18H16C15.4477 18 15 17.5523 15 17Z" fill="currentColor" />
        </svg>
    );
};

export default Logo;