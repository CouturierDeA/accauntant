/* CONFIGURATION */

// Node imports
const path = require('path');
const express = require('express');
const opn = require('opn');
const app = express(); // Create our app with express

app.use(express.static(__dirname + '/dist')); // Set the static files location

let port = 5000;
let uri = 'http://localhost:' + port;

app.listen(port, function (err) {
    if (err) {
        console.log(err);
        return
    }
    console.log("App listening on port http://localhost:" + port); // listen to the port
    opn(uri)
});

const controller = require('./build/controller.js');
controller(app);