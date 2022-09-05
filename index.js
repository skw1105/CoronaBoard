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
const globalStatController = require('./controller/global-stat.controller');
const keyValueController = require('./controller/key-value.controller');

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

    // Router (HTTP요청이 왔을 때 Controller의 함수로 요청을 전달하도록 라우팅 설정)
    // GlobalStat
    app.get('/global-stats', globalStatController.getAll);
    app.post('/global-stats', globalStatController.insertOrUpdate);
    app.delete('/global-stats', globalStatController.remove);
    // KeyValue
    app.get('/key-value/:key', keyValueController.get);
    app.post('/key-value', keyValueController.insertOrUpdate);
    app.delete('/key-value/:key', keyValueController.remove);


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