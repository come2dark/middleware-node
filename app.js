const express = require('express');
const app = express();
const port = 5555;
const request = require('request');
var bodyParser = require('body-parser');
var fs = require('fs');

//Custom SE Middleware Libraries
const tokenLib = require('./integration_libs/token.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(port, function () {
    fs.mkdir('./logs', (err) => {});
    console.log(`BitPay SE Middleware running on port ${port}`)
});

app.get('/', function (req, res) {
    res.send('GET...out of here');
});

/** TOKEN CHECK ***/
app.get('/api/version', function (req, res) {
    tokenLib.tokenCheck(req,res)
});
