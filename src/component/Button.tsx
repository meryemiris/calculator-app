import React from "react";

interface ButtonProps {
  value: string;
  onClick: () => void;
  customClassName: string;
}

const Button: React.FC<ButtonProps> = ({ value, onClick, customClassName }) => {
  return (
    <>
      <button className={customClassName} onClick={onClick}>
        {value}
      </button>
    </>
  );
};

export default Button;
