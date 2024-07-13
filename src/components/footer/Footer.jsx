import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full text-center py-4 bg-gray-800 text-white">
      <p className='px-8'>
        Digital Timer by Deependra Rajput. All rights reserved &copy; {new Date().getFullYear()}
      </p>
    </footer>
  )
}

export default Footer
