import React from "react";
import { Link } from 'react-router-dom';

function BotaoNav({ text, link }) {
  return (
    <div>
      <Link to={link}>{text}</Link>
    </div>
  );
}

export default BotaoNav;
