
import './style.scss';

const Login = ({isExist, onCredChange, handleKeyPress, onSubmit, error}) =>{
    const handleDataChange = (event) =>{
        const { name, value } = event.target;
        onCredChange(name, value);
      }
   
    return(
       <div className="loginbody">
        <div className="login-form">
            <div className="centeredDiv">
        {!isExist && <span className="error">{error}</span>}
        <h1>Personal Assistant</h1>
        <div className="input-container">
        <input type="text" name="user" onChange={handleDataChange} onKeyDown={handleKeyPress} placeholder="Username"/>
        <input type="password" name="password" placeholder="Password" onChange={handleDataChange} onKeyDown={handleKeyPress}/>
        <button type="submit" onClick={onSubmit}>Submit</button>
        </div>
        </div>
        </div>
        </div>
    
    
    )
}

export default Login;