import React, { useEffect, useState } from 'react';
import './listar.css';

function ListarClientes() {
    const [data, setData] = useState(null);
    const [clientesFiltrados, setClientesFiltrados] = useState(null);
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/clientes');
                const jsonData = await response.json();
                setData(jsonData);
                setClientesFiltrados(jsonData);
            } catch (error) {
                console.error('Erro ao obter dados:', error);
            }
        };

        fetchData();
    }, []);

    const handleFiltroChange = (e) => {
        const novoFiltro = e.target.value.toLowerCase();
        setFiltro(novoFiltro);

        if (novoFiltro === '') {
            setClientesFiltrados(data);
        } else {
            const clientesFiltrados = data.filter((cliente) => {
                return (
                    cliente.nome.toLowerCase().includes(novoFiltro) ||
                    cliente.email.toLowerCase().includes(novoFiltro) ||
                    cliente.telefone.toLowerCase().includes(novoFiltro)
                );
            });

            setClientesFiltrados(clientesFiltrados);
        }
    };

    return (
        <div className='container'>
            <div className='cabecalho'>
                <h1>Clientes:</h1>
                <button className='botao'>Visualizar melhor rota</button>
            </div>
            <input
                className='input-text'
                type="text"
                placeholder="Filtrar por nome, email ou telefone"
                value={filtro}
                onChange={handleFiltroChange}
            />
            {clientesFiltrados && (
                <table className='tabela'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientesFiltrados.map((item) => (
                            <tr key={item.id}>
                                <td className='align-center'>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.email}</td>
                                <td>{item.telefone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ListarClientes;
