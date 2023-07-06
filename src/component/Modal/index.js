import './style.scss';
import closecon from "../../assets/ic_close.png";
const Modal = ({onClose}) =>{
    return(
        <>
        <div className="info-modal">
            <button className="close-btn" onClick={onClose}><img src={closecon} alt="close"/></button>
        <p>ChattyMind is an artificial intelligence (AI) language model developed from OpenAI API. It is based on the GPT-3.5 architecture and is trained on a large corpus of text data, including books, articles, and websites. </p>
            
        <p>ChattyMind can generate human-like responses to a wide range of topics and questions, making it a powerful tool for natural language processing (NLP) applications.</p>

<p>ChattyMind can understand and respond to text input in a conversational manner, making it suitable for use in chatbots and other virtual assistant applications. </p>
    <p>It can also be used to generate text content for a variety of purposes, including article writing, creative writing, and content marketing.</p>
        </div>
        </>
    )
}

export default Modal;