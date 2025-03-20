
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 bg-blue-600 opacity-70 rounded-full"></div>
        <div className="absolute inset-1 border-2 border-white rounded-full"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-white rotate-45"></div>
        </div>
      </div>
      <span className="text-white font-heading font-bold text-xl tracking-wider">OJ.TRACK</span>
    </div>
  );
};

export default Logo;
