const express = require('express')
const router = express.Router()
const departmentController = require('../../controller/departmentController')
const validate = require('../../utils/validate')

router.get('/getdata', departmentController.getdata)
router.post('/adddata', departmentController.adddata) //validate("userValidation"),
router.post('/getonedata', departmentController.getonedata)
router.post('/updatedata', departmentController.updatedata)
router.delete('/deletedata', departmentController.deletedata)


module.exports = router