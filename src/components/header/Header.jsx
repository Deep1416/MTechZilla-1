import { UserButton } from '@clerk/clerk-react';
import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white py-4 px-10 flex justify-between items-center">
      {/* Left side with company logo */}
      <div className="flex items-center">
        <h1 className="heading text-white font-medium text-center font-roboto text-lg md:text-4xl">Digital Timer</h1>
      </div>
      
      {/* Right side with user profile */}
      <div className="flex items-center">
        <span className="mr-4">Welcome</span>
        <UserButton />
      </div>
    </header>
  );
};

export default Header;
