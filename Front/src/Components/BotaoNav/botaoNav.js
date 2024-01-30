import React from "react";
import { Link } from 'react-router-dom';
import './botaoNav.css';

function BotaoNav({ text, link, descricao }) {
  return (
    <div>
      <Link to={link}  className="styled-link">
        <div className="caixa-botao">
          <div className="texto-caixa">
            <span className="titulo-btn">{text}</span>
            <br />
            <span className="descricao-btn">{descricao}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default BotaoNav;
