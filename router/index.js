const express = require('express')
const router = express.Router()
const auth = require('./auth')
const user = require('./user/index')
const department = require('./department/index')
const {authorize} = require('../middleware/jwtuser')

router.use('/user',user) 
router.use('/auth',auth)
router.use('/department',department)
    
module.exports = router