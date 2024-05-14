import React, { useState } from "react";
import "./Form.css";

function Form() {
  const [inputValue, setInputValue] = useState('');
  const [optionValue, setOptionValue] = useState('');
  const [result,setResult] = useState('');

  function calculate(event){
    event.preventDefault();
    if(optionValue=='') setResult('Invalid Option.');
    else if(inputValue=='') setResult('Empty Input.')
    else {
      const arr = inputValue.split(',');
      const numberArr=[]
      let check = true;
  
      for(const num of arr){
        if (Number(num)/1==num) numberArr.push(Number(num))
        else {
          setResult(`Invalid Input, ${num} is not a number`)
          check = false
        }
      }
  
      if(check){
        let res = 0
        if(optionValue == 'sum'){
          for(const num of numberArr){
            res += num
          }
        }
        if(optionValue == 'average'){
          for(const num of numberArr){
            res += num
          }
          res = res/numberArr.length
        }
        if(optionValue == 'mode'){
          const obj={}
          let max = 0
          for(const num of numberArr){
            if(obj[num]) obj[num]++
            else{ obj[num]= 1 }
          }
          for(const key in obj){
            if(obj[key]>max){
              max=obj[key]
            }  
          }
          const modes =[]
          for(const key in obj){
            if(obj[key]==max){
              modes.push(key)
            }  
          }
          console.log(modes)
          res=modes.join(',')

        }
  
        setResult(res)
        setInputValue('')
      }
    }
    
    
    
  }
  return (
    <>
      <form onSubmit={calculate}>
        <input id="values" name="values" onChange={(e)=>{setInputValue(e.target.value)}} value={inputValue}type="text" />
        <select onChange={(e)=>{setOptionValue(e.target.value)}} id="operation" name="operation">
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
