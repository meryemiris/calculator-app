export const calculate = (expression: string): string => {
  try {
    const result = eval(expression);
    return result.toString();
  } catch (error) {
    return "Error";
  }
};
