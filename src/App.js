import {useState, useEffect} from 'react'
import Login from './component/login'
import Chat from './component/Chat/index.js'

function App() {
  const myObject = [
    {name: 'test@test.com', password: 'test@123'},
    {name: 'John@cvs.com', password: 'test@123'},
    {name: 'Bill@cvs.com', password: 'test@123'}
  ];
const [isExist, setIsExist] = useState(false);
const [error, setError] = useState('');
const [cred, setCred] = useState({
  user: '',
  password: ''
});

useEffect(() => {
  const storedUser = sessionStorage.getItem('loggeduser');

    // If a stored value exists, set the count state to the stored value
    if (storedUser) {
      setIsExist(true);
    } 
}, []);


if (!localStorage.getItem('myObject')) {
localStorage.setItem('myObject', JSON.stringify(myObject));
}

const handleCredChange = (name,value) => {
  setCred({
    ...cred,
    [name]: value
  });
};

function handleKeyPress(event) {
    if (event.keyCode === 13 && cred.user!=='' && cred.password !=='') {
        onSubmit();
    }
  }

const onSubmit = () =>{
    const parsedArray = JSON.parse(localStorage.getItem('myObject'));
    const person = parsedArray.find((u) => u.name === cred.user && u.password === cred.password);
  if (person) {
    setIsExist(true);
    sessionStorage.setItem('loggeduser', cred.user);
  } else {
    setIsExist(false);
  }
  setCred({
    ...cred,
    user: ''
  });
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
      <Login isExist={isExist} onCredChange={handleCredChange} handleKeyPress={handleKeyPress} onSubmit={onSubmit} error={error}/>
    )}
  </div>
);
}

export default App;
