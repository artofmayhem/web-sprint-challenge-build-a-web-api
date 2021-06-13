const express = require('express');
//define server using express
const server = express();
// router imports
const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');



//json parser
server.use(express.json())
server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
server.get("/",(req,res)=>{
    //console.log(data)
    res.status(200).json({message:"SERVER OPERATIONAL code: 200"})
})


module.exports = server;
