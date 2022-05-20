// build your server here and require it from index.js
const express = require('express')

const ProjectRouter = require('./project/router')
const ResourceRouter = require('./resource/router')
const TaskRouter = require('./task/router')

const server = express()

server.use(express.json())
server.use('/api/project', ProjectRouter)
server.use('/api/resource', ResourceRouter)
server.use('/api/task', TaskRouter)

module.exports = server;