const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'clean',
    password: 'sht@#$X89',
    port: 5432,
});

app.use(express.json());

app.use(cors());

app.get('/clientes', async (req, res) => {
    const client = await pool.connect();

    try {
        const query = 'SELECT * FROM clientes';
        const result = await client.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao executar a consulta.');
        return;
    } finally {
        client.release();
    }
});

app.post('/clientes', async (req, res) => {
    try {
        const { nome, email, telefone, coordenada_x, coordenada_y } = req.body;

        const query = 'INSERT INTO clientes (nome, email, telefone, coordenada_x, coordenada_y) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [nome, email, telefone, coordenada_x, coordenada_y];

        const result = await pool.query(query, values);

        res.status(200).json({
            success: true,
            message: 'Cadastro realizado com sucesso!',
            results: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Erro ao realizar cadastro.',
            error: error.message
        });
    }
});

app.get('/rota', async (req, res) => {
    const client = await pool.connect();

    try {
        // 1. Consulta para obter a lista de clientes ordenada pela distância
        const query = 'SELECT *, SQRT(coordenada_x * coordenada_x + coordenada_y * coordenada_y) AS distancia FROM clientes ORDER BY distancia;';
        const result = await client.query(query);
        const clientes = result.rows;

        // 2. Ponto de partida
        const pontoInicial = { nome: 'Sede', coordenada_x: 0, coordenada_y: 0 };

        // 3. Inicializa a rota com o ponto de partida
        const rota = [pontoInicial];

        // 4. Implementação do algoritmo do Vizinho Mais Próximo
        while (rota.length < clientes.length + 1) {
            const ultimoPonto = rota[rota.length - 1];
            let clienteMaisProximo = null;
            let distanciaMinima = Number.MAX_VALUE;

            for (const cliente of clientes) {
                if (!rota.includes(cliente) && cliente !== pontoInicial) {
                    const distancia = Math.sqrt(
                        Math.pow(cliente.coordenada_x - ultimoPonto.coordenada_x, 2) +
                        Math.pow(cliente.coordenada_y - ultimoPonto.coordenada_y, 2)
                    );

                    if (distancia < distanciaMinima) {
                        distanciaMinima = distancia;
                        clienteMaisProximo = cliente;
                    }
                }
            }

            // Adiciona o cliente mais próximo à rota
            rota.push(clienteMaisProximo);
        }

        // 5. Retorna ao ponto de partida
        rota.push(pontoInicial);

        res.json(rota);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao executar a consulta.');
        return;
    } finally {
        client.release();
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});