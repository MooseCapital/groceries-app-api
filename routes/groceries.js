const express = require('express');
const router = express.Router();
const {getGroceries} = require('../controllers/groceriesController')

/* GET users listing. */
router.get('/getall' , getGroceries)


module.exports = router;
