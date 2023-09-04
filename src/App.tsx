import "./App.css";
import Buttons from "./component/Buttons";
import { useState } from "react";

function App() {
  const [displayValue, setDisplayValue] = useState("");

  return (
    <>
      <div className="calculator">
        <div className="display">{displayValue}</div>
        <Buttons setDisplayValue={setDisplayValue} />
      </div>
    </>
  );
}

export default App;
