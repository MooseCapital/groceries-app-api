const validator = require('validator');
const knex = require('../database_setup/db');

const helloWorld = (async (req, res) => {
    try {
        return res.status(200).json({msg: 'hello world'})
    }
    catch (e) {
        console.error('Error getting home:', e);
        return res.status(500).json({error: 'could not get data'})
    }
})

module.exports = {helloWorld}