import { useState } from "react";

import styles from "./Calculator.module.css";

const buttonLayout = [
  ["C", "+/-", "%", "/"],
  [7, 8, 9, "*"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
].flat();

function calculate(tokens: string): number {
  const values: number[] = [];
  const ops: string[] = [];

  const tokenizedInput =
    tokens.match(/(\d+(\.\d+)?|[\\+\-\\*\\/\\(\\)])|./g) || [];

  for (const token of tokenizedInput) {
    if (token === "+" || token === "-" || token === "*" || token === "/") {
      while (
        ops.length > 0 &&
        precedence(ops[ops.length - 1]) >= precedence(token)
      ) {
        const val2 = values.pop() || 0;
        const val1 = values.pop() || 0;
        const op = ops.pop() || "+";
        values.push(applyOperator(val1, val2, op));
      }
      ops.push(token);
    } else {
      values.push(parseFloat(token));
    }
  }

  while (ops.length > 0) {
    const val2 = values.pop() || 0;
    const val1 = values.pop() || 0;
    const op = ops.pop() || "+";
    values.push(applyOperator(val1, val2, op));
  }

  return values[0];
}

function precedence(operator: string): number {
  if (operator === "+" || operator === "-") {
    return 1;
  }
  if (operator === "*" || operator === "/") {
    return 2;
  }
  return 0;
}

function applyOperator(a: number, b: number, operator: string): number {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) {
        throw new Error("Division by zero");
      }
      return a / b;
    default:
      throw new Error("Invalid operator");
  }
}

const Buttons: React.FC = () => {
  const [input, setInput] = useState("");

  function handleButtonClick(value: string) {
    if (value === "=") {
      try {
        const sanitizedInput = input.replace(/[^0-9+\-*/().]/g, "");
        const result = calculate(sanitizedInput);
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
      setInput((prevValue) =>
        prevValue.startsWith("-") ? prevValue.slice(1) : "-" + prevValue
      );
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
            value={value.toString()}
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
