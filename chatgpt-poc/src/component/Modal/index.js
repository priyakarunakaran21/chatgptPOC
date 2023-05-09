import './style.scss';

const Modal = ({onClose}) =>{
    return(
        <>
        <div className="info-modal">
            <button className="close-btn" onClick={onClose}>X</button>
        hre goes the info about our chattyMind
        </div>
        </>
    )
}

export default Modal;