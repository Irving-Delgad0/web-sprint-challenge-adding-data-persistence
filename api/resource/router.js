// build your `/api/resources` router here
const express = require('express')
const Resources = require('./model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Resources.getAll()
    .then(resource => {
        res.json(resource)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
    const resource = req.body
    Resources.create(resource)
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