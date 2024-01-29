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
                <ul>
                    {data.map((item) => (
                        <li key={item.id}>{item.nome}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ListarClientes;