import React from "react";

type DrawerPosition = "top" | "bottom" | "left" | "right";

interface CustomDrawerProps {
  open: boolean;
  onClose: () => void;
  position?: DrawerPosition;
  title: string;
  children: React.ReactNode;
}

const FSDrawer: React.FC<CustomDrawerProps> = ({
  open,
  onClose,
  position = "bottom",
  title,
  children,
}) => {
  // Determine the transform class based on drawer position and open state
  let transformClass = "";
  if (open) {
    // When open, we want no translation
    transformClass = "translate-x-0 translate-y-0";
  } else {
    // When closed, translate the drawer completely off-screen based on the position.
    switch (position) {
      case "top":
        transformClass = "-translate-y-full";
        break;
      case "bottom":
        transformClass = "translate-y-full";
        break;
      case "left":
        transformClass = "-translate-x-full";
        break;
      case "right":
        transformClass = "translate-x-full";
        break;
      default:
        transformClass = "translate-y-full";
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 bg-white p-4 transform transition-transform duration-300 ease-out ${transformClass}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <button onClick={onClose} aria-label="Close Drawer" className="p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default FSDrawer;