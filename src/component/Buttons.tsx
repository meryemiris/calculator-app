import styles from "../styles/Buttons.module.css";
import Button from "./Button";

const Buttons = () => {
  const numbersSets = [[9, 8, 7], [6, 5, 4], [3, 2, 1], ["."]];

  return (
    <div className={styles.buttons}>
      <button className={styles.operationTop}>C</button>
      <button className={styles.operationTop}>+/-</button>
      <button className={styles.operationTop}>%</button>
      <button className={styles.operation}>÷</button>

      {numbersSets[0].map((number) => (
        <Button key={number} value={number.toString()} />
      ))}

      <button className={styles.operation}>x</button>

      {numbersSets[1].map((number) => (
        <Button key={number} value={number.toString()} />
      ))}

      <button className={styles.operation}>-</button>

      {numbersSets[2].map((number) => (
        <Button key={number} value={number.toString()} />
      ))}

      <button className={styles.operation}>+</button>
      <button className={styles.zero}>0</button>

      {numbersSets[3].map((number) => (
        <Button key={number} value={number.toString()} />
      ))}

      <button className={styles.operation}>=</button>
    </div>
  );
};

export default Buttons;
