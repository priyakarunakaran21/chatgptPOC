import { useState, useRef, useEffect } from 'react';

import './style.scss';
import Sidebar from './sidebar';
const Chat = ({messages}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [conversationHistory, setConversationHistory] = useState('');
  const [savedConversationHistory, setSavedConversationHistory] = useState('');
  const [chatSessions, setChatSessions] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  const myRef = useRef(null);
  let convoSession = '';
  let newbotHistory1 = '';
  const newbotHistory1Ref = useRef('');
  const [regenerateCount, setRegenerateCount] = useState(0);
  const [regenerate, setRegenerate] = useState(false);
  let htmlCode;
  const conversationHistoryRef = useRef('');
  const promptRef = useRef('');
  const [prompt, setPrompt] = useState('');
  const [chatbotResponse, setChatbotResponse] = useState('');
  const [intro, setIntro] = useState(true);
  
  useEffect(() => {
    if (regenerateCount > 0) {
      regenerateResponses();
    }
  }, [regenerateCount]);

  const startNewSession = () => {
    debugger;
    if(chatbotResponse !== ""){
    let convoSession = '';
    let newbotHistory1 = '';
    conversationHistoryRef.current = '';
    setConversationHistory('');
    setChatbotResponse('');
    setIntro(true);
    setChatSessions((prevSessions) => [...prevSessions, chatbotResponse]);
  }else{alert("New window is already open")}
  };
  
  const savedHistory1 = (index) => {
    //console.log(savedConversationHistory);
    
    setIntro(false);
    conversationHistoryRef.current = chatSessions[index];
    setChatbotResponse(chatSessions[index]);
  };

  //console.log(savedConversationHistory);
  const regenerateResponses = async () => {
    try {
      // const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${apiKey}`,
      //   },
      //   body: JSON.stringify({
      //     prompt: newbotHistory1Ref.current,
      //     max_tokens: 500,
      //     n: 1,
      //   }),
      // });
      const formData = new FormData();
                  formData.append('input_text', newbotHistory1Ref.current);
                  formData.append('task', 'deidentify_summarize_chatgpt');
        
                  const response = await fetch('http://13.232.63.102/deid/messages', {    
                    method: 'POST',
                    body: formData
                  });
    
          const data = await response.json();
          const generatedText = data.summary_chatgpt.trim();

     if (isCode(generatedText)) {
              // ${chatbotMessage.replace(/\n/g, '<br />').replace(/`([^!]+)`/g, '<pre><code>$1</code></pre>')}
              htmlCode= `<div class="bot-chat"><span class="bot"></span><div class="message-bubble"><pre><code>${generatedText.replace(/\n/g, '<br />')}</code></pre></div></div>\n\n`;
            } else {
              htmlCode = `<div class="bot-chat"><span class="bot"></span><div class="message-bubble">${generatedText.replace(/\n/g, '<br />')}</div></div>\n\n`;
            }

          if (response.ok) {
            const deidMessage = data.deidentified.trim();
           const chatbotMessage = data.summary_chatgpt.trim();
            const newbotHistory = `${conversationHistoryRef.current}  ${chatbotMessage}\n\n`;
            conversationHistoryRef.current = newbotHistory;
            const newbotSession =  `${htmlCode}\n\n`;
            setChatbotResponse((prevText) => prevText.concat(newbotSession));
            //console.log(chatbotResponse);
            //console.log(newbotSession);
          } else {
            throw new Error(data.error.message);
          }
        } catch (error) {
          setChatbotResponse(`Error: ${error.message}`);
        }
    
        scrollToBottom();
      };
      const scrollToBottom = () => {
        setTimeout(function () {
          myRef.current.scrollIntoView(false);
        }, 10);
      };
    
     
    
      function handleChange(event) {
        setPrompt(promptRef.current.value);
      }
    
      function handleKeyPress(event) {
        if (event.keyCode === 13) {
          handleEnter();
        }
      }
    
      function isCode(text) {
        return /^\s/.test(text) || text.startsWith("import") || text.startsWith("function") || text.startsWith("//Function") || text.startsWith("public");
      }
    
      const handleEnter = async () => {
        setIntro(false);
        const newHistory = `${conversationHistoryRef.current} You: ${prompt}\n`;
        conversationHistoryRef.current = newHistory;
        newbotHistory1Ref.current = newHistory;
    
        const convoSession = `<div class="person-chat"><span class="user"></span><label class="user-message-bubble">${prompt}\n</label></div>`;
        const newChatSession = `${chatbotResponse}${convoSession}`;
        setChatbotResponse((prevText) => prevText.concat(convoSession));
    
        try {
          // const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //     'Authorization': `Bearer ${apiKey}`,
          //   },
          //   body: JSON.stringify({
          //     prompt: conversationHistoryRef.current,
          //     max_tokens: 500,
          //     n: 1,
          //     temperature: 0.2
          //   }),
          // });
            const formData = new FormData();
                    formData.append('input_text', conversationHistoryRef.current);
                    formData.append('task', 'deidentify_summarize_chatgpt');
          
                    const response = await fetch('http://13.232.63.102/deid/messages', {    
                      method: 'POST',
                      body: formData
                    });
          
                   const data = await response.json();
                   debugger
    
                   const generatedText = data.summary_chatgpt.trim();

                   if (isCode(generatedText)) {
                     // ${chatbotMessage.replace(/\n/g, '<br />').replace(/`([^!]+)`/g, '<pre><code>$1</code></pre>')}
                     htmlCode= `<div class="bot-chat"><span class="bot"></span><div class="message-bubble"><pre><code>${generatedText.replace(/\n/g, '<br />')}</code></pre></div></div>\n\n`;
                   } else {
                     htmlCode = `<div class="bot-chat"><span class="bot"></span><div class="message-bubble">${generatedText.replace(/\n/g, '<br />')}</div></div>\n\n`;
                   }
    
          if (response.ok) {
            const deidMessage = data.deidentified.trim();
           const chatbotMessage = data.summary_chatgpt.trim();
            const newbotHistory = `${conversationHistoryRef.current}  ${chatbotMessage}\n\n`;
            conversationHistoryRef.current = newbotHistory;
            const newbotSession = `<div class="de-bot-chat"><span class="de-bot"></span><div class="de-message-bubble">${deidMessage.replace(/\n/g, '<br />')}</div></div>\n\n ${htmlCode}\n\n`;
            //const newbotSession = `${htmlCode}\n\n`;
            setChatbotResponse((prevText) => prevText.concat(newbotSession));
          } else {
            throw new Error(data.error.message);
          }
        } catch (error) {
          setChatbotResponse(`Error: ${error.message}`);
        }
        //setChatbotResponse(newChatSession);
        setRegenerate(false);
        scrollToBottom();
        setPrompt("");
      };
    

      return (
        <div className="App">
          
          <div className="chat-wrapper">
            <div className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
              {/* Sidebar content here */}
              {/* <button className="toggle-button" onClick={toggleSidebar}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="24px"><path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"/></svg>
              </button> */}
              <Sidebar isShow={!isSidebarCollapsed} startNewSession={startNewSession} savedHistory1={savedHistory1} chatSessions={chatSessions}/>
            </div>
            <div className={`chat-container ${!isSidebarCollapsed ? 'shrink' : ''}`} ref={myRef}>
              {intro ? (
                <div className="message-thread">
                  <div className="center-align">
                    <h1>Welcome to ChattyMind!</h1>
                    <p>Click send to start the conversation</p>
                  </div>
                </div>
              ) : (
                <div className="message-thread">
                  <div className="convo-wrap" dangerouslySetInnerHTML={{ __html: chatbotResponse }}></div>
                </div>
              )}
              <div className="input-wrapper">
                {!intro && <button className="regenerate-btn" onClick={regenerateResponses}>Regenerate responses</button>}
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
    
         
        </div>
      );
    }
    
    export default Chat;