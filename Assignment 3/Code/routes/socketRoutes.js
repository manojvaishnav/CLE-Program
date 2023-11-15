const express = require('express')
const { testSocket } = require('../controller/socketController')

const router = express.Router()

router.get('/',testSocket)

module.exports = router