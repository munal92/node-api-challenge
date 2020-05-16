const express = require('express');

const server = express();

server.use(express.json());



server.get('/' , (req,res) => {
    res.send(`<h1> &#10003;  API IS WORKING</h1>`)
})




module.exports = server;

