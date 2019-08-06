const express = require('express');
const app = express();
const request = require('request');
var bodyParser = require('body-parser');
var fs = require('fs');

const { dev_endpoint, prod_endpoint, dev_token, prod_token,env,port } = require('./integration_libs/config')

//Custom SE Middleware Libraries
const tokenLib = require('./integration_libs/token.js');
const invoiceLib = require('./integration_libs/invoice.js');


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

/** CREATE INVOICE ***/
app.post('/api/createInvoice', function (req, res) {
    invoiceLib.createTransaction(req,res,request)
});
