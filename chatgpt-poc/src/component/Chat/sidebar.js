import React, { useState } from 'react';

const Sidebar = ({isShow}) => {
  
  return (
    isShow ? 
      <div className="conversation-history-card">
        <h2>Conversation History</h2>
        
        <button className="history-item">
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" 
            strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
                Chat 1
        </button>
   </div> : <></>
  );
};

export default Sidebar;