// ES6, To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
// import express from 'express';
// import bodyParser from 'body-parser';

// Common Js
const express = require('express');
const bodyParser = require('body-parser');

// const app = express();
// app.use(bodyParser.json());

// // path route 와 request handler를 등록해줌
// app.get('/', (req, res) => {
//     res.json({message: 'Hello CoronaBoard!'});
// });

// const port = process.env.PORT || 8080;
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}.`);
// });


const {sequelize} = require('./database');
async function launchServer() {
    const app = express(); // express 인스턴스
    app.use(bodyParser.json());

    app.get('/', (req, res) => {
        res.json({
            message: 'Hello CoronaBoard!'
        });
    });
    app.get('/global-stat/:cc', (req, res) => {
        const cc = req.params.cc;
    });

    try {
        await sequelize.sync();
        console.log('Database is ready!');
    } catch (error) {
        console.log('Unable to connect to the database:');
        console.log(error);
        process.exit(1);
    }

    const port = process.env.PORT || 8080;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

launchServer();