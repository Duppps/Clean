const express = require('express');
const { Client } = require('pg');
const app = express();
const port = 3000;

app.get('/clientes', (req, res) => {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'clean',
        password: 'sht@#$X89',
        port: 5432,
    });

    client.connect();

    const query = 'SELECT * FROM clientes';

    client.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao executar a consulta.');
            return;
        }

        console.log(result.rows);

        res.json(result.rows);

        client.end();
    });
});

app.post('/clientes', (req, res) => {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'clean',
        password: 'sht@#$X89',
        port: 5432,
    });

    client.connect();

    const query = 'INSERT INTO CLIENTES VALUES ';

    client.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao executar a consulta.');
            return;
        }

        console.log(result.rows);

        res.json(result.rows);

        client.end();
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});