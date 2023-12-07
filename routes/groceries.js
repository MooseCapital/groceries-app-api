const express = require('express');
const router = express.Router();
const {getGroceries, addStock, searchGroceries,removeStock} = require('../controllers/groceriesController')

/* GET users listing. */
router.get('/getall' , getGroceries)
router.put('/addstock/:id' , addStock)
router.put('/removestock/:id' , removeStock)
router.get('/search' , searchGroceries)


module.exports = router;
