const express = require('express');
const router = express.Router();
const { test, getPage, ip, transactionTest, streamFile} = require("../controllers/testController");

/* GET users listing. */
router.get('/' , test)

router.get('/page' , getPage)
router.get('/transaction/:id' , transactionTest)
router.get('/ip',ip)
router.get('/streamfile/:filename',streamFile)

module.exports = router;