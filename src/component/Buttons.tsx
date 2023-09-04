import styles from "../styles/Buttons.module.css";
import Button from "./Button";

interface ButtonsProps {
  setDisplayValue: React.Dispatch<React.SetStateAction<string>>;
}

const Buttons: React.FC<ButtonsProps> = ({ setDisplayValue }) => {
  const buttonLayout = [
    ["C", "+/-", "%", "÷"],
    [7, 8, 9, "x"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
  ].flat();

  const handleButtonClick = (value: string) => {
    if (value === "C") {
      setDisplayValue("");
    } else if (value === "+/-") {
      setDisplayValue((prevValue) =>
        prevValue.startsWith("-") ? prevValue.slice(1) : "-" + prevValue
      );
    } else if (value === "%") {
      setDisplayValue((prevValue) => (parseFloat(prevValue) / 100).toString());
    } else {
      setDisplayValue((prevValue) => prevValue + value);
    }
  };

  return (
    <>
      <div className={styles.buttons}>
        {buttonLayout.map((value) => (
          <Button
            key={value}
            value={value.toString()}
            onClick={() => handleButtonClick(value.toString())}
            customClassName={
              ["÷", "x", "-", "+", "="].includes(value.toString())
                ? styles.operation
                : ["C", "+/-", "%", "÷"].includes(value.toString())
                ? styles.operationTop
                : value === 0
                ? styles.zero
                : styles.button
            }
          />
        ))}
      </div>
    </>
  );
};

export default Buttons;
