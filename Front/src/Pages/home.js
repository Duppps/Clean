import React from 'react';
import BotaoNav from "../Components/botaoNav";

function Home() {
    return (
        <div>
            <h1>Minha Aplicação React</h1>
            <BotaoNav text="Listar Clientes" link="/listar" />
            <BotaoNav text="Cadastrar Clientes" link="/cadastro" />
        </div>
    );
}

export default Home;