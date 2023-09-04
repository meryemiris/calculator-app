import "./App.css";
import Buttons from "./component/Buttons";
import { useState } from "react";

function App() {
  const [displayValue, setDisplayValue] = useState("");
  const [result, setResult] = useState<string | number>(0);

  return (
    <>
      <div className="calculator">
        <div className="display">{result !== 0 ? result : displayValue}</div>
        <Buttons
          setDisplayValue={setDisplayValue}
          setResult={setResult}
          input={displayValue}
        />
      </div>
    </>
  );
}

export default App;
