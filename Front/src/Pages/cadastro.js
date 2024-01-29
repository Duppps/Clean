import React, { useEffect, useState } from 'react';

function CadastroCliente() {
    const [dados, setDados] = useState({
        nome: '',
        email: '',
        telefone: '',
        cordenadaX: '',
        cordenadaY: ''
    });

    const handleInputChange = (e) => {
        setDados({ ...dados, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://api.exemplo.com/cadastro', {
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
                Cordenadas X:
                <input type="number" name="cordenadasX" value={dados.cordenadasX} onChange={handleInputChange} />
            </label>
            <label>
                Cordenadas Y:
                <input type="number" name="cordenadasY" value={dados.cordenadasY} onChange={handleInputChange} />
            </label>
            <br />
            <button type="submit">Cadastrar</button>
        </form>
    );
}

export default CadastroCliente;