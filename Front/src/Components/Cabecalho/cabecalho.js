import React from "react";
import { Link } from 'react-router-dom';
import './cabecalho.css';

function Cabecalho() {
  return (
    <div className="cabecalho">
      <div className="container-cabecalho">
        <Link className="btn-voltar" to='../'>Voltar</Link>
      </div>
    </div>
  );
}

export default Cabecalho;
