import React from "react";
import styles from "../styles/Buttons.module.css";
import Button from "./Button";

interface ButtonsProps {
  setDisplayValue: React.Dispatch<React.SetStateAction<string>>;
  setResult: React.Dispatch<React.SetStateAction<string | number>>;
  input: string;
}

const Buttons: React.FC<ButtonsProps> = ({
  setDisplayValue,
  setResult,
  input,
}) => {
  const buttonLayout = [
    ["C", "+/-", "%", "/"],
    [7, 8, 9, "*"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
  ].flat();

  function handleButtonClick(value: string) {
    if (value === "=") {
      try {
        const result = calculate(input);
        setDisplayValue(result.toString());
        setResult(result);
      } catch (error) {
        setResult("Error");
      }
    } else if (value === "C") {
      setDisplayValue("");
      setResult(0);
    } else if (value === "+/-") {
      setDisplayValue((prevValue) =>
        prevValue.startsWith("-") ? prevValue.slice(1) : "-" + prevValue
      );
    } else if (value === "%") {
      setDisplayValue((prevValue) => (parseFloat(prevValue) / 100).toString());
    } else {
      setDisplayValue((prevValue) => prevValue + value);
    }
    console.log(value);
  }

  function calculate(tokens: string): number {
    const values: number[] = [];
    const ops: string[] = [];

    for (const token of tokens) {
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

  return (
    <>
      <div className={styles.buttons}>
        {buttonLayout.map((value) => (
          <Button
            key={value}
            value={value.toString()}
            onClick={() => handleButtonClick(value.toString())}
            customClassName={
              ["/", "*", "-", "+", "="].includes(value.toString())
                ? styles.operations
                : ["C", "+/-", "%"].includes(value.toString())
                ? styles.modifiers
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
