import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Cabecalho from '../../Components/Cabecalho/cabecalho';
import './listar.css';

function ListarClientes() {
    const [data, setData] = useState(null);
    const [rota, setRota] = useState(null);
    const [clientesFiltrados, setClientesFiltrados] = useState(null);
    const [filtro, setFiltro] = useState('');

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleOpenModal = () => {

        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/rota');
                const jsonData = await response.json();
                setRota(jsonData);
            } catch (error) {
                console.error('Erro ao obter dados:', error);
            }
        };

        fetchData();

        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
    };

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
        <div>
            <Cabecalho></Cabecalho>
            <div className='container'>
                <div className='cabecalho-pagina'>
                    <h1>Clientes:</h1>
                    <button className='botao' onClick={handleOpenModal}>Visualizar melhor rota</button>
                </div>
                <input
                    className='input-text'
                    type="text"
                    placeholder="Filtrar por nome, email ou telefone"
                    value={filtro}
                    onChange={handleFiltroChange}
                />
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={handleCloseModal}
                    contentLabel="Rota"
                    style={{ content: { width: '60vw', height: '60vh', margin: 'auto' } }}
                >
                    {rota && (
                        <ul>
                            {rota.map((item) => (
                                <li key={item.id}>
                                    {item.nome}
                                    <br />
                                    X: {item.coordenada_x} -
                                    Y: {item.coordenada_y}
                                </li>
                            ))}

                        </ul>
                    )}
                </Modal>
                {clientesFiltrados && (
                    <table className='tabela'>
                        <thead>
                            <tr>
                                <th className='colunaID'>ID</th>
                                <th>Nome</th>
                                <th className='colunaEmail'>Email</th>
                                <th className='colunaTelefone'>Telefone</th>
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
        </div>
    );
}

export default ListarClientes;
