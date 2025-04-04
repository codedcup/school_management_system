import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-blue-500 text-white p-4  ">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-center sm:text-left">
          <p className="text-sm">© {new Date().getFullYear()} xAI. All rights reserved.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm">
          <a href="#" className="hover:text-blue-200 transition duration-200">About Us</a>
          <a href="#" className="hover:text-blue-200 transition duration-200">Contact</a>
          <a href="#" className="hover:text-blue-200 transition duration-200">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;