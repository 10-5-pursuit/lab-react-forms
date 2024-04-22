// Form.jsx

import React, { useState } from "react";
import "./Form.scss";

function Form() {
  const [inputValues, setInputValues] = useState("");
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState("");

  const handleInputChange = (e) => {
    setInputValues(e.target.value);
  };

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
  };

  const calculateResult = () => {
    const numbers = inputValues.split(",").map((value) => parseFloat(value.trim()));

    // Check if input values are valid numbers
    if (numbers.some(isNaN)) {
      setResult("Invalid input.");
      return;
    }

    let calculationResult;

    switch (operation) {
      case "sum":
        calculationResult = numbers.reduce((acc, curr) => acc + curr, 0);
        break;
      case "average":
        calculationResult = numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length;
        break;
      case "mode":
        const frequency = {};
        numbers.forEach((num) => {
          frequency[num] = (frequency[num] || 0) + 1;
        });
        const maxFrequency = Math.max(...Object.values(frequency));
        calculationResult = Object.keys(frequency).find((key) => frequency[key] === maxFrequency);
        break;
      default:
        setResult("Invalid operation.");
        return;
    }

    setResult(calculationResult);
  };

  return (
    <>
      <form onSubmit={(e) => { e.preventDefault(); calculateResult(); }}>
        <input id="values" name="values" type="text" value={inputValues} onChange={handleInputChange} />
        <select id="operation" name="operation" value={operation} onChange={handleOperationChange}>
          <option value=""></option>
          <option value="sum">sum</option>
          <option value="average">average</option>
          <option value="mode">mode</option>
        </select>
        <button type="submit">Calculate</button>
      </form>
      <section id="result">
        <p>{result}</p>
      </section>
    </>
  );
}

export default Form;
