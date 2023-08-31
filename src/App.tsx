import "./App.css";

function App() {
  return (
    <>
      <div className="calculator">
        <div className="display">
          <div className="buttons">
            <button className="operationTop">C</button>
            <button className="operationTop">+/-</button>
            <button className="operationTop">%</button>
            <button className="operation">÷</button>
            <button className="button">7</button>
            <button className="button">8</button>
            <button className="button">9</button>
            <button className="operation">x</button>
            <button className="button">4</button>
            <button className="button">5</button>
            <button className="button">6</button>
            <button className="operation">-</button>
            <button className="button">1</button>
            <button className="button">2</button>
            <button className="button">3</button>
            <button className="operation">+</button>
            <button className="zero">0</button>
            <button className="button">.</button>
            <button className="operation">=</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
