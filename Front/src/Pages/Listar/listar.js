import './listar.css';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Cabecalho from '../../Components/Cabecalho/cabecalho';

function ListarClientes() {
    const [clientes, setClientes] = useState(null);
    const [clientesTable, setClientesTable] = useState(null);
    const [rota, setRota] = useState(null);
    const [filtro, setFiltro] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const fetchData = async (uri) => {
        try {
            const response = await fetch(uri);
            const { results: data } = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao obter dados:', error);
        }
    };

    useEffect(() => {
        const ExibeClientes = async () => {
            const data = await fetchData('http://localhost:3000/clientes');
            setClientes(data);
            setClientesTable(data);
        };

        ExibeClientes();
    }, []);

    const OpenModal = async () => {
        const Data = await fetchData('http://localhost:3000/rota');
        setRota(Data);
        setModalIsOpen(true);
    };

    const CloseModal = () => {
        setModalIsOpen(false);
    };

    const FiltroChange = (e) => {
        const novoFiltro = e.target.value.toLowerCase();
        setFiltro(novoFiltro);

        if (novoFiltro === '') {
            setClientesTable(clientes);
        } else {
            const clientesFiltrados = clientes.filter((cliente) => {
                return (
                    cliente.nome.toLowerCase().includes(novoFiltro) ||
                    cliente.email.toLowerCase().includes(novoFiltro) ||
                    cliente.telefone.toLowerCase().includes(novoFiltro)
                );
            });

            setClientesTable(clientesFiltrados);
        }
    };

    return (
        <div style={{ marginBottom: '40px' }}>
            <Cabecalho></Cabecalho>
            <div className='container'>
                <div className='cabecalho-pagina'>
                    <h1>Clientes:</h1>
                    <button className='botao' onClick={OpenModal}>Visualizar melhor rota</button>
                </div>
                <input
                    className='input-text'
                    type="text"
                    placeholder="Filtrar por nome, email ou telefone"
                    value={filtro}
                    onChange={FiltroChange}
                />
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={CloseModal}
                    contentLabel="Rota"
                    style={{ content: { width: '60vw', height: '60vh', margin: 'auto' } }}
                >
                    {rota && (
                        <ol>
                            {rota.map((item) => (
                                <li key={item.id}>
                                    {item.nome} <br /> (X: {item.coordenada_x} - Y: {item.coordenada_y})
                                </li>
                            ))}
                        </ol>
                    )}
                </Modal>
                {clientesTable && clientesTable.length > 0 ? (
                    <table className='tabela'>
                        <thead>
                            <tr>
                                <th className='colunaID'>ID</th>
                                <th>Nome</th>
                                <th className='colunaEmail'>Email</th>
                                <th className='colunaTelefone'>Telefone</th>
                                <th className='colunaCoordenada'>Coordenada X</th>
                                <th className='colunaCoordenada'>Coordenada Y</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientesTable.map((item) => (
                                <tr key={item.id}>
                                    <td className='align-center'>{item.id}</td>
                                    <td>{item.nome}</td>
                                    <td>{item.email}</td>
                                    <td>{item.telefone}</td>
                                    <td>{item.coordenada_x}</td>
                                    <td>{item.coordenada_y}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Nenhum cliente cadastrado!</p>
                )}
            </div>
        </div>
    );
}

export default ListarClientes;