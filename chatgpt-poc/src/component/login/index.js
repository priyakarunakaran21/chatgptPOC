import {useState} from 'react'
import Chat from '../Chat';
import './style.scss';

const Login = () =>{
    const myArray = ['apple', 'banana', 'orange'];
    const myObject = [{
        name: 'John',
        messages:{
           text: "I'm doing well too!"
        }},{
        name: 'Bill',
        messages:{
            text: "Best people make the world a better to live"
        }
      }];
      const [messages, setMessages] = useState('');
    const [user, setUser] = useState('')
    const [isExist, setIsExist] = useState(false);
    const [error, setError] = useState('');
    
    localStorage.setItem('myArray', JSON.stringify(myArray));
    localStorage.setItem('myObject', JSON.stringify(myObject));

    const handleInputChange = (event) => {
        setUser(event.target.value);
      };

    function handleKeyPress(event) {
        setUser(event.target.value);
        if (event.keyCode === 13) {
            onSubmit();
        }
      }
   
    const onSubmit = () =>{
        const parsedArray = JSON.parse(localStorage.getItem('myObject'));
      //  setIsExist(parsedArray.includes(user));
      const person = parsedArray.find((u) => u.name === user);
      if (person) {
        setIsExist(true);
        setMessages(person.messages.text);
      } else {
        setIsExist(false);
      }
        
        setUser('');
        setError("User is unauthorized");
    }
    return(<>
        {isExist ?
        <Chat messages={messages}/> : 
        <div className="login-form">
            <div className="centeredDiv">
        {!isExist && <span className="error">{error}</span>}
        <h1>Enter your user name</h1>
        <div className="input-container">
        <input type="text" onChange={handleInputChange} onKeyDown={handleKeyPress}/>
        <button type="submit" onClick={onSubmit}>Submit</button>
        </div>
        </div>
        </div>}
        </>
    
    
    )
}

export default Login;