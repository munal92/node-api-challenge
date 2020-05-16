const express = require('express')
const server = express();



const projectsRouter = require('./Routers/projects-router.js');
const actionsRouter = require('./Routers/actions-router.js');


server.use(express.json());
server.use('/api/projects',projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/' , (req,res) => {
    res.send(`<h1> &#10003;  API IS WORKING</h1>`)
})




module.exports = server;

