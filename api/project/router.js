// build your `/api/projects` router here
const express = require('express')
const Projects = require('./model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Projects.getAll()
    .then(project => {
        res.json(project)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  const project = req.body
  Projects.create(project)
  .then(result => {
    res.json(result)
  }) 
  .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      sageAdvice: 'Something went wrong!',
      message: err.message,
      stack: err.stack,
    })
  })

module.exports = router;