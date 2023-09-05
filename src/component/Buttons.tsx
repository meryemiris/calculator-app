import styles from "../styles/Buttons.module.css";
import Button from "./Button";

interface ButtonsProps {
  setDisplay: React.Dispatch<React.SetStateAction<string>>;
  input: string;
}

const Buttons: React.FC<ButtonsProps> = ({ setDisplay, input }) => {
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
        const sanitizedInput = input.replace(/[^0-9+\-*/().]/g, "");
        const result = calculate(sanitizedInput);
        setDisplay(result.toString());
      } catch (error) {
        setDisplay("Error");
      }
    } else if (value === "C") {
      setDisplay("");
    } else if (value === "+/-") {
      setDisplay((prevValue) =>
        prevValue.startsWith("-") ? prevValue.slice(1) : "-" + prevValue
      );
    } else if (value === "%") {
      setDisplay((prevValue) => (parseFloat(prevValue) / 100).toString());
    } else if (value === ".") {
      const lastToken = input.split(/[-+*/]/).pop();

      if (lastToken && !lastToken.includes(".") && input !== "") {
        setDisplay((prevValue) => prevValue + ".");
      } else if (lastToken === "") {
        setDisplay((prevValue) => prevValue + "0.");
      }
    } else {
      setDisplay((prevValue) => prevValue + value);
    }
  }

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
