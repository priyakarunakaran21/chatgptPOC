import { useState, useRef} from 'react';
import Modal from '../Modal/index'
import './style.scss'
import sendIcon from "../../assets/send-icon.png";
const Chat = () => {
    const apiKey = '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';
    const myRef = useRef(null);
    let conversationHistory = '';
    let convoSession = '';
    const [prompt, setPrompt] = useState('');
    const [chatbotResponse, setChatbotResponse] = useState('');
    const [intro, setIntro] = useState(true);
    const [showModal, setShowModal] = useState(false); 
    
    const scrollToBottom = () => {
        setTimeout(function () {
            myRef.current.scrollIntoView(false);
        }, 10);
      };

    // function to handle click of the info icon
    const handleInfoIconClick = () => {
      setShowModal(true); // set showModal to true to display the modal
    };
  
    // function to handle closing the modal
    const handleModalClose = () => {
      setShowModal(false); // set showModal to false to hide the modal
    };
    
    function handleChange(event) {
      setPrompt(event.target.value);
    }
    
    function handleKeyPress(event) {
      if (event.keyCode === 13) {
        handleEnter();
      }
    }
  
  
    const handleEnter = async() =>{
    setIntro(false);
    conversationHistory += `You: ${prompt}\n`;
    convoSession = `<span class="user">U</span><label class="user-message-bubble">${prompt}\n</label>`;
    setChatbotResponse(prevText => prevText.concat(convoSession));
    try {
        const response = await fetch('https://api.openai.com/v1/engines/text-davinci-002/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: conversationHistory,
          max_tokens: 500,
          n: 1,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        const chatbotMessage = data.choices[0].text.trim();
        console.log(chatbotMessage);
        conversationHistory += `ChatBot: ${chatbotMessage}\n\n`;
        convoSession =  `<span class="bot">Bot</span><label class="message-bubble"> ${chatbotMessage}\n\n</label>`;
        setChatbotResponse(prevText => prevText.concat(convoSession));
      
        
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      setChatbotResponse(`Error: ${error.message}`);
    }
    scrollToBottom()
    setPrompt("")
    }
  
  
    return (
      <div className="App">
        <span className="info-circle" onClick={handleInfoIconClick}>i</span>
        <div className="chat-wrapper">
        <div className="conversation-history-card">
        <h2>Conversation History</h2>
        {!intro && 
        <button className="history-item">
        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" 
        stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
            Chat 1
            </button>}
         {/* <div className="conversation-history-list">
          <p>You: Hi</p>
          <p>Chatbot: Hello! How can I assist you today?</p>
          <p>You: Can you help me find a good restaurant in the area?</p>
          <p>Chatbot: Sure thing! What type of cuisine are you in the mood for?</p>
          <p>You: Italian sounds good.</p>
          <p>Chatbot: Great! I recommend trying out Pasta Bella. It's one of the highest rated Italian restaurants in the area.</p>
          <p>You: Thanks for the recommendation.</p>
          <p>Chatbot: You're welcome! Enjoy your meal.</p>
        <p>You: Hi</p>
          <p>Chatbot: Hello! How can I assist you today?</p>
          <p>You: Can you help me find a good restaurant in the area?</p>
          <p>Chatbot: Sure thing! What type of cuisine are you in the mood for?</p>
          <p>You: Italian sounds good.</p>
          <p>Chatbot: Great! I recommend trying out Pasta Bella. It's one of the highest rated Italian restaurants in the area.</p>
          <p>You: Thanks for the recommendation.</p>
          <p>Chatbot: You're welcome! Enjoy your meal.</p>
         </div> */}
       
       </div>
  
          <div className="chat-container" ref={myRef}>
         
          {intro ?
              <div className="message-thread">
                <div className="center-align">
                    <h1>Welcome to ChattyMind!</h1>
                    <p>Click send to start the conversation</p>
            
            </div>
           </div>
            :
  
             <div className="message-thread">
             {chatbotResponse.split('\n').map((str, index) => (
           <p className="message" key={index} dangerouslySetInnerHTML={{ __html: str }}>
             {/* {str}
             {index !== chatbotResponse.split('\n').length - 1 && <br />} */}
           </p>
         ))}
         </div>
           
          }
            <div className="input-wrapper">
            {!intro && <button className="regenerate-btn">Regenrate responses</button>}
            <div className="message-input">
                
            <input type="text" id="user-input" className="message-input-field" 
              placeholder="Send message..." 
              value={prompt} onChange={handleChange} 
              onKeyDown={handleKeyPress}  />
              <button type="submit" onClick={handleEnter}>Send</button>
            </div>
            </div>
          </div>
  
      </div>
  
  
  
  
     
  
  {/* modal */}
  {showModal && (
    <Modal onClose={handleModalClose}>
      {/* modal content goes here */}
    </Modal>
  )}
     
      </div>
    );
  }
  
  export default Chat;