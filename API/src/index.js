const { Pool } = require('pg');
const express = require('express');
const app = express();
const port = 3000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'clean',
    password: 'sht@#$X89',
    port: 5432,
});

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

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao processar a requisição.');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});