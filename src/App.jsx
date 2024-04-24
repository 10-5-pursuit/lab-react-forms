import React, { useState } from "react";
import "./App.css";

function Calculator() {
  const [input, setInput] = useState("");
  const [operation, setOperation] = useState("sum");
  const [result, setResult] = useState("");
  const [error, setError] = useState(false);

  const calculate = () => {
    const numbers = input.split(",").map(Number);
    // Check if any input is not a number
    if (numbers.some(isNaN)) {
      setError(true);
      setResult("Invalid input.");
      return;
    }
    setError(false);
    setInput("");
    switch (operation) {
      case "sum":
        // Calculate the sum of all numbers
        setResult(numbers.reduce((a, b) => a + b, 0));
        break;
      case "average":
        // Calculate the average of all numbers
        setResult(numbers.reduce((a, b) => a + b, 0) / numbers.length);
        break;
      case "mode":
        // Calculate the mode of the numbers
        const freq = numbers.reduce(
          (a, b) => ((a[b] = (a[b] || 0) + 1), a),
          {}
        );
        const mode = Object.keys(freq).reduce((a, b) =>
          freq[a] > freq[b] ? a : b
        );
        setResult(mode);
        break;
      default:
        setResult("");
    }
  };

  return (
    <div className="main-container">
      <p>Enter each number in the array, separated by a ','</p>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={error ? "error" : ""}
        />
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          className={error ? "error" : ""}
        >
          <option value="sum">Sum</option>
          <option value="average">Average</option>
          <option value="mode">Mode</option>
        </select>
        <button onClick={calculate}>Calculate</button>
      </div>
      <div className="result-container">{result}</div>
    </div>
  );
}

export default Calculator;
