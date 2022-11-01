import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './InfoBar.css';

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/">
        <button className='text-white border-0 text-xs bg-blue-600 p-2 rounded-3xl hover:bg-red-500'>Leave Room</button>
        </a>
    </div>
  </div>
);

export default InfoBar;