import './style.scss'
const DeIdentify = () =>{
    return(
        <div className="de-wrapper">
        <h1>De-Identification and summaraization</h1>
        <div className="form-group">
        <label>Input text: </label>
        <textarea/>
        </div>
        <div className="form-group">
        <label>Select Task: </label>
        <select>
            <option>De-identification</option>
            <option> Summaraization</option>
        </select>
        </div>
        <div className="form-submit">
        <button type="submit">Submit</button>
        </div>
        </div>
    )
}

export default DeIdentify;