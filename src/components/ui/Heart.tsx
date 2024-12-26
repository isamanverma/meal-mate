import React from "react";

interface HeartIconProps {
  fillColor: string;
}

const HeartIcon: React.FC<HeartIconProps> = ({ fillColor }) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9476 2.04807L11.9519 2.05243L12.0003 2.10076C13.2708 0.804359 15.0414 0 17 0C20.866 0 24 3.13401 24 7C24 9.44196 22.7496 11.5919 20.8541 12.8444L11.8995 21.799L2.05243 11.9519L2.04807 11.9476L2 11.8995L2.00025 11.8992C0.762917 10.6367 0 8.90744 0 7C0 3.13401 3.13401 0 7 0C8.90744 0 10.6367 0.762917 11.8992 2.00025L11.8995 2L11.9476 2.04807Z"
        fill={fillColor}
      />
    </svg>
  );
};

export default HeartIcon;
