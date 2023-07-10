import {useState, useEffect} from 'react'

import Login from './component/login'

import Chat from './component/Chat/index.js'

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

 

function App() {

const [isExist, setIsExist] = useState(false);

const [error, setError] = useState('');

const [cred, setCred] = useState({

  user: ''

});

const [userData, setUserdata] = useState([])

let newData;

 

const fetchData = async (user) => { debugger

  try{

    const response = await fetch(`https://edp-dev-dgt-he.ehip.dev.cvshealth.com/operations/bot/getMessages?email=${user}`);

    if(!response.ok){

      throw new Error("Error:", response.status);

    }

    const data = await response.json();

    newData = data;

  }catch(error){

    console.error(error);

  }

 

  return newData

}

 

useEffect(() => {

  const storedUser = sessionStorage.getItem('loggeduser');

 

    if (storedUser) {

      (async () => {

        setUserdata(await fetchData(storedUser));

      })();

      setIsExist(true);

    }

}, []);

const handleCredChange = (name,value) => {

  setCred({

    ...cred,

    [name]: value

  });

};

 

function handleKeyPress(event) {

    if (event.keyCode === 13 && cred.user!=='') {

        onSubmit();

    }

  }

 

const onSubmit = async() =>{

  debugger

  const parsedArray = await fetchData(cred.user);

  setUserdata(parsedArray);

  if (parsedArray !== undefined && parsedArray.email === cred.user) {

    setIsExist(true);

    sessionStorage.setItem('loggeduser', cred.user);

  } else {

    setError("Invalid email Id");

    setIsExist(false);

    setCred({

      ...cred,

      user: ''

    });

  }

}

 

const onLogout = () =>{

  setIsExist(false);

  setError('');

}

  return (

    isExist ? (

      <Chat endsession={onLogout} chats={userData.conversations} email={cred.user}/>

    ) : (

      <Login isExist={isExist} onCredChange={handleCredChange} handleKeyPress={handleKeyPress} onSubmit={onSubmit} error={error}/>

    )

);

}

 

export default App;