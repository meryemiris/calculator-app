import "./App.css";
import Buttons from "./component/Buttons";
import { useState } from "react";

function App() {
  const [display, setDisplay] = useState("");

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
