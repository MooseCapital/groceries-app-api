const express = require('express');
// const {getPage} = require("../controllers/test");
const {helloWorld} = require("../controllers/indexController");
const router = express.Router();

/* GET home page. */
router.get('/', helloWorld);
// router.get('/page' , getPage );

module.exports = router;
