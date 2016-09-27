'use strict';
const PORT = 5000;

const colors = require('colors/safe');
const express = require('express');
const router = require('./api/router');
const bodyParser = require('body-parser');
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(router);

app.listen(PORT, () => console.log(colors.blue(`>>>>> Server started and listening on port ${PORT} <<<<<`)));
