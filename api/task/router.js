// build your `/api/tasks` router here
const express = require('express')
const Tasks = require('./model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Tasks.getAll()
    .then(resource => {
        res.json(resource)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
    const task = req.body
    Tasks.create(task)
    .then(result => {
        res.json(result)
    })
    .catch(next)
})


module.exports = router