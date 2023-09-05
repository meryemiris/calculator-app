import "./App.css";
import Buttons from "./component/Buttons";
import { useState } from "react";

function App() {
  const [display, setDisplay] = useState("");
  // const [result, setResult] = useState<string | number>(0);

  return (
    <>
      <div className="calculator">
        <div className="display">{display}</div>
        <Buttons setDisplay={setDisplay} input={display} />
      </div>
    </>
  );
}

export default App;
