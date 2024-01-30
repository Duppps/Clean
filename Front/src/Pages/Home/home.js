import React from 'react';
import BotaoNav from "../../Components/BotaoNav/botaoNav";
import "./home.css";

function Home() {
    return (
        <div className='containerMain'>
            <div className='containerHome'>                
                <BotaoNav text="Listar Clientes" descricao="Lista os clientes cadastrados" link="/listar" />
                <BotaoNav text="Cadastrar Clientes" descricao="Cadastra um novo cliente" link="/cadastro" />
            </div>
        </div>
    );
}

export default Home;