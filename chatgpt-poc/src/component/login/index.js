
import './style.scss';

const Login = ({isExist, handleInputChange, handleKeyPress, onSubmit, error}) =>{
   
   
    return(
       
        <div className="login-form">
            <div className="centeredDiv">
        {!isExist && <span className="error">{error}</span>}
        <h1>Enter your user name</h1>
        <div className="input-container">
        <input type="text" onChange={handleInputChange} onKeyDown={handleKeyPress}/>
        <button type="submit" onClick={onSubmit}>Submit</button>
        </div>
        </div>
        </div>
    
    
    )
}

export default Login;