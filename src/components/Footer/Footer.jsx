import React from 'react';

function Footer() {
  return (
    <footer className="  text-black py-8 w-full mt-12  rounded-2xl ">
      <div className=" sm:px-6 lg:px-8">
        <p className="text-center text-sm sm:text-base mb-2">
          Developed by <span className="font-semibold">Diwank Singh</span> | All Rights Reserved
        </p>
        <p className="text-center text-sm sm:text-base">Thank you for visiting!</p>
        <div className="mt-4 text-center">
          <hr className="border-gray-700 mb-4" />
          <a href="#top" className="text-gray-400 hover:text-white transition-colors duration-300">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
