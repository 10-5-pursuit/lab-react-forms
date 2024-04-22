import React from "react";
import "./Form.css";
import { useState } from "react";

function Form() {
  let a = [];
  const [valid, changeValid] = useState(true);
  const [textInput, changeTextInput] = useState([]);
  const [result, changeResult] = useState("");
  const [selectOption, setSelectOption] = useState("");

  function calculate (operation, a){
    let result = -Infinity;
    if (operation === "sum")
      result = a.reduce((num, total) => total+=num);
    else if (operation === "average")
      result = (a.reduce((num, total) => total+=num)) / a.length;
    else if (operation === "mode"){
      let freq = {};
      for (let i = 0; i < a.length; i++){
        if(!freq[a[i]]) freq[a[i]] = 0;
        freq[a[i]]++;
      }
      for (const key in freq)
        if (freq[key] > result)
          result = Number(key)
    }
    if (isNaN(result)){
      changeValid(false);
      return "INVALID INPUT";
    }
    changeValid(true);
    return result;
  }

  function handleSubmit(event){
    event.preventDefault();
    a = textInput.map(x => Number(x));
    changeResult(calculate(selectOption, a));
    if(valid)
      resetForm();
  }

  function handleTextChange(event){
    changeTextInput(event.target.value.split(","));
  }

  function handleSelectChange(event){
    setSelectOption(event.target.value);
  }
  
  function resetForm(){
    changeTextInput("");
    a = [];
    setSelectOption("");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input className={valid ? "" : "error"} onChange={handleTextChange} id="values" name="values" type="text" value={textInput} />
        <select className={valid ? "" : "error"} required value={selectOption} onChange={handleSelectChange} id="operation" name="operation">
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
