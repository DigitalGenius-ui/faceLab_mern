import React, { useState } from 'react';
import Profile from '../Profile/Profile';
import Chat from "../Chat/Chat";
import "./Home.scss";
import Feed from '../Feed/Feed';
import MarkunreadIcon from "@mui/icons-material/Markunread";

const Home = () => {
  const [openMessage, setOpenMessage] = useState(false);
  return (
      <section className='home'>
        <div className="left"><Profile/></div>
        <div className="center"><Feed/></div>
        <div className={`right ${openMessage ? "active" : ""}`}><Chat /></div>
      <span onClick={() => setOpenMessage(!openMessage)} className="messageIcon">
        <MarkunreadIcon className='icon' />
      </span>
    </section>
  )
}

export default Home