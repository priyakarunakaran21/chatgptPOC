import {useState} from 'react'
import Login from './component/login'
import Chat from './component/Chat/index.js'

function App() {
  const myObject = [
    {name: 'test@test.com'},
    {name: 'John@cvs.com'},
    {name: 'Bill@cvs.com'}
  ];
const [user, setUser] = useState('')
const [isExist, setIsExist] = useState(false);
const [error, setError] = useState('');

if (!localStorage.getItem('myObject')) {
localStorage.setItem('myObject', JSON.stringify(myObject));
}

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
    const person = parsedArray.find((u) => u.name === user);
  if (person) {
    setIsExist(true);
    sessionStorage.setItem('loggeduser', user);
  } else {
    setIsExist(false);
  }
    
    setUser('');
    setError("User is unauthorized");
}

const onLogout = () =>{
  setIsExist(false);
  setError('');
}
  return (
    <div>
    {isExist ? (
     <Chat endsession={onLogout}/>
    ) : (
      <Login isExist={isExist} handleInputChange={handleInputChange} handleKeyPress={handleKeyPress} onSubmit={onSubmit} error={error}/>
    )}
  </div>
);
}

export default App;
