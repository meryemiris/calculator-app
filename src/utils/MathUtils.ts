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

export default function calculate(tokens: string): number {
  const values: number[] = [];
  const ops: string[] = [];

  const tokenizedInput = tokens.match(/(\d+(\.\d+)?|[-+*/()]|\S)/g) || [];

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
    } else if (token === "(") {
      ops.push(token);
    } else if (token === ")") {
      while (ops.length > 0 && ops[ops.length - 1] !== "(") {
        const val2 = values.pop() || 0;
        const val1 = values.pop() || 0;
        const op = ops.pop() || "+";
        values.push(applyOperator(val1, val2, op));
      }
      ops.pop(); // Pop the "("
    } else {
      // Handle negative numbers by appending a minus sign to the number
      if (token.startsWith("-")) {
        const negNumber = -parseFloat(token.slice(1));
        values.push(negNumber);
      } else {
        values.push(parseFloat(token));
      }
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
