import React, { useState } from 'react';

const Example = () => {
  const [inputValue, setInputValue] = useState('');
  const [output, setOutput] = useState('');
  const myArray = ['apple', 'banana', 'orange'];
  const [isExist, setIsExist] = useState(false);



  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    
  };
  function handleKeyPress(event) {
    if (event.keyCode === 13) {
      handleEnter(event);
    }
  }
  const handleEnter = (event) =>{debugger
    setOutput(output +'<br/>'+  event.target.value);
const parsedArray = JSON.parse(localStorage.getItem('myArray'));
setIsExist(parsedArray.includes(event.target.value));
    setInputValue("");
  }
  console.log(isExist);
console.log(output);
  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyPress} />
      <div dangerouslySetInnerHTML={{__html: output}}></div>
    {isExist ? <p>Hurre!</p> : <p>Oops</p>}
    </div>
  );
}

export default Example;