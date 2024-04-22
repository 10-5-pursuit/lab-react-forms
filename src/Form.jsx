import React from "react";
import { useState } from "react";
import "./Form.css";

function Form() {
  const [arr, setArr] = useState([]);
  const [result, setResult] = useState("");
  const [error, setError] = useState(false);

  const handleForm = (event) => {
    event.preventDefault();
    const operation = event.target.operation.value;
    const values = event.target.values.value.split(",");
    if (!operation || !values) {
      event.target.values.classList.add("error");
      event.target.operation.classList.add("error");
      setResult("Invalid input.");
    } else {
      if (operation == "sum") {
        let sum = 0;
        for (const num of values) {
          sum += Number(num);
        }
        setResult(sum);
      } else if (operation == "average") {
        let sum = 0;
        for (const num of values) {
          sum += Number(num);
        }
        setResult(sum / values.length);
      } else if (operation == "mode") {
        const valuesFreq = {};
        for (const value of values) {
          if (!valuesFreq[value]) {
            valuesFreq[value] = 1;
          } else {
            valuesFreq[value]++;
          }
        }
        let max = Object.keys(valuesFreq)[0];
        console.log(max);
        for (const value in valuesFreq) {
          if (valuesFreq[max] < valuesFreq[value]) {
            max = value;
          }
        }
        setResult(max);
      }
      event.target.operation.value = "";
      event.target.values.value = "";
      event.target.values.classList.remove("error");
      event.target.operation.classList.remove("error");
    }
  };

  return (
    <>
      <form onSubmit={handleForm}>
        <input id="values" name="values" type="text" />
        <select id="operation" name="operation">
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
