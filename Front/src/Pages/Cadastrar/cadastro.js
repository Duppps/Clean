import React, { useState } from 'react';
import Cabecalho from '../../Components/Cabecalho/cabecalho';
import './cadastro.css';

function CadastroCliente() {
    const [dados, setDados] = useState({
        nome: '',
        email: '',
        telefone: '',
        coordenada_x: '',
        coordenada_y: ''
    });

    const handleInputChange = (e) => {
        setDados({ ...dados, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            const data = await response.json();

            if(data.success) {
                alert(data.message);
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.error('Erro ao realizar cadastro:', error);
        }
    };

    return (
        <div>
            <Cabecalho></Cabecalho>
            <div className='container'>
                <form onSubmit={handleSubmit} className='mtop-20'>
                    <div className='form-container'>
                        <div className="form-label width100">
                            <label>Nome: </label>
                            <input
                                type="text"
                                name="nome"
                                value={dados.nome}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                        </div>
                        <div className="form-label width100">
                            <label>Email: </label>
                            <input
                                type="text"
                                name="email"
                                value={dados.email}
                                className="form-input"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-label width50">
                            <label>Telefone: </label>
                            <input
                                type="text"
                                name="telefone"
                                value={dados.telefone}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                        </div>
                    </div>
                    <div className='form-container'>
                        <div className="form-label">
                            <label>Coordenadas X: </label>
                            <input
                                type="number"
                                name="coordenada_x"
                                value={dados.coordenada_x}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                        </div>
                        <div className="form-label">
                            <label>Coordenadas Y: </label>
                            <input
                                type="number"
                                name="coordenada_y"
                                value={dados.coordenada_y}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                        </div>
                    </div>
                    <button type="submit" className='form-submit'>Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export default CadastroCliente;