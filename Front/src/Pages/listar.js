import React, { useEffect, useState } from 'react';

function ListarClientes() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/clientes');
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Erro ao obter dados:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Clientes:</h1>
            {data && (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
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