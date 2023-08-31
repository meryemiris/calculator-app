import React from "react";
import style from "../styles/Button.module.css";

interface ButtonProps {
  value: string;
}
const Button: React.FC<ButtonProps> = ({ value }) => {
  return (
    <>
      <button className={style.button}>{value}</button>
    </>
  );
};

export default Button;
