import { useState } from "react";
import { evaluate } from "mathjs";

import styles from "./Calculator.module.css";

const buttonLayout = [
  ["C", "+/-", "%", "/"],
  [7, 8, 9, "*"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
].flat();

const Buttons: React.FC = () => {
  const [input, setInput] = useState("");

  function handleButtonClick(value: string) {
    if (value === "=") {
      try {
        const sanitizedInput = input.replace(/[^0-9+\-*/().]/g, "");
        const result = evaluate(sanitizedInput);
        const formattedResult =
          Math.abs(result) < 0.01 || Number.isInteger(result)
            ? result.toString()
            : result.toFixed(2);
        setInput(formattedResult);
      } catch (error) {
        setInput("Error");
      }
    } else if (value === "C") {
      setInput("");
    } else if (value === "+/-") {
      const isPartOfExpression = input.match(/[-+*/]/g);
      if (isPartOfExpression) {
        setInput((prevValue) => {
          const lastOperatorIndex = prevValue.search(/[-+*/]$/);
          return (
            prevValue.slice(0, lastOperatorIndex + 1) +
            (prevValue[lastOperatorIndex + 1] === "-" ? "" : "-") +
            prevValue.slice(lastOperatorIndex + 1)
          );
        });
      } else {
        setInput((prevValue) =>
          prevValue.startsWith("-") ? prevValue.slice(1) : "-" + prevValue
        );
      }
    } else if (value === "%") {
      setInput((prevValue) => (parseFloat(prevValue) / 100).toString());
    } else if (value === ".") {
      const lastToken = input.split(/[-+*/]/).pop();
      if (lastToken && !lastToken.includes(".") && input !== "") {
        setInput((prevValue) => prevValue + ".");
      } else if (lastToken === "") {
        setInput((prevValue) => prevValue + "0.");
      }
    } else {
      setInput((prevValue) => prevValue + value);
    }
  }

  return (
    <div className={styles.calculator}>
      <div className={styles.input}>{input}</div>
      <div className={styles.buttons}>
        {buttonLayout.map((value) => (
          <button
            key={value}
            onClick={() => handleButtonClick(value.toString())}
            className={
              ["/", "*", "-", "+", "="].includes(value.toString())
                ? styles.operations
                : ["C", "+/-", "%"].includes(value.toString())
                ? styles.modifiers
                : value === 0
                ? styles.zero
                : styles.button
            }
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Buttons;
