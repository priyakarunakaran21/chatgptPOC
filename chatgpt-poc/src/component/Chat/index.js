import { useState, useRef, useEffect} from 'react';
import Modal from '../Modal/index'
import './style.scss'
const Chat = ({messages}) => {
    const apiKey = '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';
    const myRef = useRef(null);
    let convoSession = '';
    let conversationHistory = '';
    let newbotHistory1 = '';

    const conversationHistoryRef = useRef('');
    const newbotHistory1Ref = useRef('');
    const promptRef = useRef('');
    const [regenerateCount, setRegenerateCount] = useState(0);
    



  
    // const [conversationHistory, setConversationHistory] = useState('');
    const [prompt, setPrompt] = useState('');
    const [chatbotResponse, setChatbotResponse] = useState('');
    const [intro, setIntro] = useState(true);
    const [showModal, setShowModal] = useState(false); 
    
    // useEffect(() => {
    //     console.log('Conversation history updated:', conversationHistory);
    //   }, [conversationHistory, prompt]);

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
      setPrompt(promptRef.current.value);
    }
    
    function handleKeyPress(event) {
      if (event.keyCode === 13) {
        handleEnter();
      }
    }
  
    //const newbotHistoryRef = { value: null };
    const handleEnter = async () => {
      setIntro(false);
      const newHistory = `${conversationHistoryRef.current} You: ${prompt}\n`;
      conversationHistoryRef.current = newHistory;
      newbotHistory1Ref.current = newHistory;

      const convoSession = `<span class="user">U</span><label class="user-message-bubble">${prompt}\n</label>`;
      setChatbotResponse((prevText) => prevText.concat(convoSession));
    
      try {
        const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            prompt: conversationHistoryRef.current,
            max_tokens: 500,
            n: 1,
          }),
        });
    
        const data = await response.json();
        if (response.ok) {
          const chatbotMessage = data.choices[0].text.trim();
          const newbotHistory = `${conversationHistoryRef.current}  ${chatbotMessage}\n\n`;
          conversationHistoryRef.current = newbotHistory;
          const newbotSession = `<span class="bot">Bot</span><label class="message-bubble"> ${chatbotMessage}\n\n</label>`;
          setChatbotResponse((prevText) => prevText.concat(newbotSession));
          if (regenerateCount > 0) {
            regenerateResponses(); // Regenerate responses when regenerateCount is greater than 0
          }
        } else {
          throw new Error(data.error.message);
        }
      } catch (error) {
        setChatbotResponse(`Error: ${error.message}`);
      }
    
      scrollToBottom();
      setPrompt('');
    };
    
  const showSession = () =>{
      setIntro(false);
  }
  //console.log(newbotHistory1Ref.current);
  const regenerateResponses = async () => {
    //const history = newbotHistory1Ref.current;
    //console.log(history);
    console.log(newbotHistory1Ref.current);
    try {
      const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: newbotHistory1Ref.current,
        max_tokens: 500,
        n: 1,
      }),
    });
  
      const data = await response.json();
      if (response.ok) {
        const chatbotMessage = data.choices[0].text.trim();
        const newbotHistory = `${conversationHistoryRef.current}  ${chatbotMessage}\n\n`;
        conversationHistoryRef.current = newbotHistory;
        const newbotSession = `<span class="bot">Bot</span><label class="message-bubble"> ${chatbotMessage}\n\n</label>`;
        setChatbotResponse((prevText) => prevText.concat(newbotSession));
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      setChatbotResponse(`Error: ${error.message}`);
    }
  
    scrollToBottom();
  };
  
  useEffect(() => {
    if (regenerateCount > 0) {
      regenerateResponses();
    }
  }, [regenerateCount]);
    
  const handleRegenerate = () => {
    regenerateResponses();
  };
  
  
  
  
    return (
      <div className="App">
        <span className="info-circle" onClick={handleInfoIconClick}>i</span>
        <div className="chat-wrapper">
        <div className="conversation-history-card">
        <h2>Conversation History</h2>
        
        <button className="history-item" onClick={showSession}>
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" 
        strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
            Chat 1
            </button>
       
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
            {!intro && <button className="regenerate-btn" onClick={handleRegenerate}>Regenrate responses</button>}
            <div className="message-input">
                
            <input type="text" id="user-input" className="message-input-field" 
              placeholder="Send message..." 
              value={prompt} onChange={handleChange} 
              onKeyDown={handleKeyPress}  
              ref={promptRef} />
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