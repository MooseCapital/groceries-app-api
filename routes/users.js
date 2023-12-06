const express = require('express');
const router = express.Router();
const {getPeople, getPerson, test} = require('../controllers/usersController.js')

/* GET users listing. */
router.get('/people/:limit' , getPeople)

router.get('/person/:id' , getPerson)

router.get('/test' , test)

module.exports = router;
