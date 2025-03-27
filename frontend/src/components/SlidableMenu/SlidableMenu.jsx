import React, { useState } from "react";

const SlidableMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`fixed top-1/2 left-0 transform -translate-y-1/2 transition-all duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ width: "220px", height: "100%", backgroundColor: "#652BB3", zIndex: 100 }}
    >
      <div className='flex flex-col gap-5 p-3 items-center'>
        <img
          src='./Heroic.png'
          alt='Placeholder'
          style={{ width: "130px", height: "150px" }}
        />
        <div className="flex flex-col items-center">
          <div
          className=" rounded-lg "
            style={{ width: "180px", height: "110px", backgroundColor: "#fff" }}
          ></div>
          <h2 className=" text-lg mt-2 text-[#FEA10F] ">Performance Reports</h2>
        </div>
        <div className="flex flex-col items-center">
          <div className="rounded-lg"
            style={{ width: "180px", height: "110px", backgroundColor: "#fff" }}
          ></div>
        <h2 className=" text-lg mt-2 text-[#FEA10F] ">Schedule Tests</h2>
        </div>
        <div className="flex flex-col items-center">
          <div className="rounded-lg"
            style={{ width: "180px", height: "110px", backgroundColor: "#fff" }}
          ></div>
          <h2 className=" text-lg mt-2 text-[#FEA10F] ">Manage Profile</h2>
        </div>
      </div>
      <button
        className='absolute right-[-40px] top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white rounded-r'
        onClick={toggleMenu}
      >
        {isOpen ? "Close" : "Open"}
      </button>
    </div>
  );
};

export default SlidableMenu;
