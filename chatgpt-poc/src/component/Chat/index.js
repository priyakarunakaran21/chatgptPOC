import { useState, useRef, useEffect } from 'react';
import './style.scss';
import Sidebar from './sidebar';

// const sampleData = {
//       "chatgptApiTime": "2.128786087036133 seconds",
//       "deidentified": "[NAME] [NAME] born on[DOB]has a member ID of w[MEMBERID], SSN [SSN], and email [EMAIL_ADDRESS]. Phone number is [PHONENUMBER]",
//       "modeltime": "1.187134027481079 seconds",
//       "question": "Michael Davis born on 01/01/1950 has a member ID of w123423112, SSN 711-38-0829, and email michaeldavis@hotmail.com. Phone number is +12205344654",
//       "summary_chatgpt": "\n\nJohn Smith born on May 15, 1982 has a member ID of w123456, SSN 123-45-6789, and email johnsmith@example.com. Phone number is (222) 222-2222."
// }

const Chat = ({endsession}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [chatSessions, setChatSessions] = useState([]);
  const myRef = useRef(null);
  const newbotHistory1Ref = useRef('');
  const [sessionInit, setsessionInit] = useState(0);
  let htmlCode;
  const conversationHistoryRef = useRef('');
  const promptRef = useRef('');
  const [prompt, setPrompt] = useState('');
  const [chatbotResponse, setChatbotResponse] = useState('');
  const [ChatbotSessionHistory, setChatbotSessionHistory] = useState('');
  const [intro, setIntro] = useState(true);

  const [settings, setSettings] = useState({
    cgptModel: '',
    maxToken: '',
    numResponses: '',
    temperature: '',
    regenTemperature: ''
  });
 
  const handleSettingsChange = (name,value) => {
    setSettings({
      ...settings,
      [name]: value
    });
  };
  
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('myObject'));
  const loggeduser = sessionStorage.getItem("loggeduser");
  const person = storedData.find((u) => u.name === loggeduser);
  if(person.messages){setChatSessions([...person.messages]);savedHistory1(0);}
  }, [chatSessions.length]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  const startNewSession = () => {
    if(chatbotResponse !== ""){
    conversationHistoryRef.current = '';
    setChatbotResponse('');
    setIntro(true);
    setChatSessions((prevSessions) => [...prevSessions, chatbotResponse]);
  }else if(chatbotResponse === "" && ChatbotSessionHistory !== ""){
    conversationHistoryRef.current = '';
    setChatbotResponse('');
    setIntro(true);
  }
  else{alert("New window is already open")}
  };
  
  const savedHistory1 = (index) => {
    if(chatbotResponse!== ""){
      setChatSessions((prevSessions) => [...prevSessions, chatbotResponse]);
      const updatedData = chatSessions
      .filter((item) => item !== '') // Remove empty strings
      .concat(chatbotResponse); // Append new value
      setChatSessions(updatedData);
    }
   
    setChatbotResponse('');
    setIntro(false);
    conversationHistoryRef.current = chatSessions[index];
    setChatbotSessionHistory(chatSessions[index]);
  };

  
  const regenerateResponses = async () => {
    try {
      const formData = new FormData();
                  formData.append('input_text', newbotHistory1Ref.current);
                  formData.append('task', 'deidentify_summarize_chatgpt');
        //can access the variable like this
//                formData.append('maxToken', settings.maxToken);




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
      
        
          const response = await fetch('http://52.66.94.122/deid/messages', {    
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
           //const chatbotMessage = data.summary_chatgpt.trim();
            // const newbotHistory = `${chatbotMessage}\n\n`;
            // conversationHistoryRef.current = newbotHistory;
           // const newbotSession =  `${htmlCode}\n\n`;
           const newbotSession = `<div class="de-bot-chat"><span class="de-bot"></span><div class="de-message-bubble">${deidMessage.replace(/\n/g, '<br />')}</div></div>\n\n ${htmlCode}\n\n`;
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
        return /^\s/.test(text) || text.startsWith("import") ||text.startsWith("def") || text.startsWith("function") || text.startsWith("//Function") || text.startsWith("public");
      }
    
      const handleEnter = async () => {
        setIntro(false);
        const newHistory = `You: ${prompt}\n`;
        conversationHistoryRef.current = newHistory;
        newbotHistory1Ref.current = newHistory;
    
        const convoSession = `<div class="person-chat"><span class="user"></span><label class="user-message-bubble">${prompt}\n</label></div>`;
        //const newChatSession = `${chatbotResponse}${convoSession}`;
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
          
                    const response = await fetch('http://52.66.94.122/deid/messages', {    
                      method: 'POST',
                      body: formData
                    });
                  const data = await response.json();
                  // const data = sampleData;
                  
    
                   const generatedText = data.summary_chatgpt.trim();

                   if (isCode(generatedText)) {
                     // ${chatbotMessage.replace(/\n/g, '<br />').replace(/`([^!]+)`/g, '<pre><code>$1</code></pre>')}
                     htmlCode= `<div class="bot-chat"><span class="bot"></span><div class="message-bubble"><pre><code>${generatedText.replace(/\n/g, '<br />')}</code></pre></div></div>\n\n`;
                   } else {
                     htmlCode = `<div class="bot-chat"><span class="bot"></span><div class="message-bubble">${generatedText.replace(/\n/g, '<br />')}</div></div>\n\n`;
                   }
    
         if (response.ok) {
            const deidMessage = data.deidentified.trim();
           //const chatbotMessage = data.summary_chatgpt.trim();
           // const newbotHistory = `${chatbotMessage}\n\n`;
          //  conversationHistoryRef.current = newbotHistory;
            const newbotSession = `<div class="de-bot-chat"><span class="de-bot"></span><div class="de-message-bubble">${deidMessage.replace(/\n/g, '<br />')}</div></div>\n\n ${htmlCode}\n\n`;
            //const newbotSession = `${htmlCode}\n\n`;
            setChatbotResponse((prevText) => prevText.concat(newbotSession));
            if(sessionInit < 1 ){
          setChatSessions((prevSessions) => prevSessions.concat(chatbotResponse));
           }
          } else {
            throw new Error(data.error.message);
          }
        } catch (error) {
          setChatbotResponse(`Error: ${error.message}`);
        }
        
        setsessionInit(sessionInit+1)
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
              <Sidebar isShow={!isSidebarCollapsed} startNewSession={startNewSession} savedHistory1={savedHistory1} chatSessions={chatSessions} endsession={endsession} onDataUpdate={handleSettingsChange}/>
            </div>
            <div className={`chat-container ${!isSidebarCollapsed ? 'shrink' : ''}`} ref={myRef}>
              {intro && chatSessions.length < 1 ? (
                <div className="message-thread">
                  <div className="center-align">
                    <h1>Welcome to ChatBot!</h1>
                    <p>Click send to start the conversation</p>
                  </div>
                </div>
              ) : (
                <div className="message-thread">
                  <div className="convo-wrap" dangerouslySetInnerHTML={{ __html: chatbotResponse? chatbotResponse: ChatbotSessionHistory }}></div>
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
                  <button type="submit" onClick={handleEnter} disabled={prompt ? false: true}>Send</button>
                </div>
              </div>
            </div>
          </div>
    
         
        </div>
      );
    }
    
    export default Chat;