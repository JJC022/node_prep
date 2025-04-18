// app.js
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'medicare_db'
});

connection.connect();

app.get('/api/plans', (req, res) => {
    const state = req.query.state;

    let query = 'SELECT * FROM plans';
    if (state) {
        query += ` WHERE state = '${state}'`; // SQL Injection risk!!!
    }

    connection.query(query, (err, results) => {
        if (err) {
            throw err; // Crashes the server!
        }

        if (results.length === 0) {
            res.send('No plans found');
        } else {
            res.json(results);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
