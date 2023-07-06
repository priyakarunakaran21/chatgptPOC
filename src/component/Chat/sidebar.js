import React, { useState } from 'react';
import Modal from '../Modal/index';
import user_icon from '../../assets/member.png'
import logout from '../../assets/logout.png'
import settingsIcon from '../../assets/settings.png'
import chat from '../../assets/chat.png'
import rightarrow from '../../assets/right.png'
import downarrow from '../../assets/down.png'
import newchat from '../../assets/newchat.png'
import logo from '../../assets/logo.png'
const Sidebar = ({ isShow, startNewSession, savedHistory1, chatSessions, endsession, onDataUpdate }) => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
    const [isopenChat , setOpenChat] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showConfiguration, setshowConfiguration] = useState(false);
    const loggeduser = sessionStorage.getItem("loggeduser");
  const handleNewChat = () => {
    setSelectedButtonIndex(chatSessions.length); 
    startNewSession();
  };
  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleInfoIconClick = () => {
    setShowModal(true);
  };

  const handleSavedHistory = (index) => {
    setSelectedButtonIndex(index);
    savedHistory1(index);
  };

  const openConvo = ()=>{
    setOpenChat(!isopenChat);
  }
  const handleConfigurationToggle = () =>{
    setshowConfiguration(!showConfiguration);
  }
  const handleLogout = () =>{
    const storedData = JSON.parse(localStorage.getItem('myObject'));
    
    const person = storedData.find((u) => u.name === loggeduser);
    person.messages = chatSessions;
    
    localStorage.setItem('myObject', JSON.stringify(storedData));
    sessionStorage.removeItem("loggeduser");
    endsession(false);
  }

  const handleDataChange = (event) =>{
    const { name, value } = event.target;
    onDataUpdate(name, value);
  }

  return (
    isShow ? (
      <div className="conversation-history-card">
          <h1><img src={logo} alt=""/></h1>
         <span className="info-circle" onClick={handleInfoIconClick}>i</span>
          <div className="user-info">
              <img src={user_icon} alt=""/> <span>{loggeduser}</span>
          </div>
          <div className="menu">
              <label className="menu-label">Menu</label>
            <button className="menu-items" onClick={openConvo}><img src={chat} alt=""/><span>Conversations</span> {isopenChat ? <img className="arrow" src={downarrow} alt=""/>: <img className="arrow" src={rightarrow} alt=""/>}</button>
              {isopenChat && 
              <div className="chats">
          <button className="new-chat" onClick={handleNewChat}><img src={newchat} alt=""/>Open New Chat</button>
            {chatSessions && chatSessions.map((session, index) => (
          <button
            className={`history-item ${selectedButtonIndex === index ? 'selected' : ''}`}
            key={index}
            onClick={() => handleSavedHistory(index)}
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            Chat {index + 1}
          </button>
        ))}
        </div>
        }
        <button className="menu-items" onClick={handleConfigurationToggle}><img src={settingsIcon} alt=""/><span>Settings</span> {showConfiguration ? <img className="arrow" src={downarrow} alt=""/>: <img className="arrow" src={rightarrow} alt=""/>}</button>
        {showConfiguration && (

        <div className="configuration">
            <p><input className="full" name="api_key" type="text" placeholder="api key"  onChange={handleDataChange} /></p>
            <p><input name="maxToken" type="number" placeholder="Max Token" min="1"  onChange={handleDataChange} />
            <input name="numResponses" type="number" placeholder="No.of.Response" title="No.of.Response"  onChange={handleDataChange} /></p>
            <p><input name="temperature" type="number" placeholder="temperature" onChange={handleDataChange} />
            <input name="regenTemperature" placeholder="Reg Temperature" type="number"  onChange={handleDataChange} /></p>
        </div>)}
      <button className="menu-items" onClick={handleLogout}><img src={logout} alt=""/>Logout</button></div>
        {showModal && (
            <Modal onClose={handleModalClose}>
              {/* modal content goes here */}
            </Modal>
          )}
      </div>
    ) : null
  );
};

export default Sidebar;