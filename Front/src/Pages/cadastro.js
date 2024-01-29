import React, { useEffect, useState } from 'react';

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

            if (response.ok) {
                console.log('Cadastro realizado com sucesso!');
            } else {
                console.error('Erro ao realizar cadastro:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao realizar cadastro:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nome:
                <input type="text" name="nome" value={dados.nome} onChange={handleInputChange} />
            </label>
            <br />
            <label>
                Email:
                <input type="text" name="email" value={dados.email} onChange={handleInputChange} />
            </label>
            <label>
                Telefone:
                <input type="text" name="telefone" value={dados.telefone} onChange={handleInputChange} />
            </label>
            <label>
                Coordenadas X:
                <input type="number" name="coordenada_x" value={dados.coordenada_x} onChange={handleInputChange} />
            </label>
            <label>
                Coordenadas Y:
                <input type="number" name="coordenada_y" value={dados.coordenada_y} onChange={handleInputChange} />
            </label>
            <br />
            <button type="submit">Cadastrar</button>
        </form>
    );
}

export default CadastroCliente;