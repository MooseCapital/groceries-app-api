const validator = require('validator');
const knex = require('../database_setup/db');


const getPeople = (async (req, res) => {
    try {
        let dataArr = [] //array for multi records search in db
        //get validation for the param uuid

        const data = await knex('people').select('*').limit(req.params.limit);
        console.table(data)
        return res.status(200).json(data)
    }
    catch (e) {
        console.error('Error getting people:', e);
        //pick own status code and error specific to request!
        return res.status(500).json({error: 'could not get data'})
    }
})

const getPerson = (async (req, res) => {
    const paramID = req.params.id
    try {
        if (!validator.isUUID(paramID, [4])) {
            return res.status(500).json({msg: 'that is the wrong id'})
        }

        const data = await knex('people').select('*').where('id', paramID)
        console.table(data)
        // console.log(req.get('host'))
        return res.status(200).json(data)

    }
    catch (e) {
        console.error('Error getting person:', e);
        //pick own status code and error specific to request!
        return res.status(500).json({error: 'could not get data'})

    }
})
const test = (async (req, res) => {
    try {
        return res.status(200).json({msg: 'user test response'})
    }
    catch (e) {
        console.error('Error getting user test:', e);
        return res.status(500).json({error: 'could not fetch'})
    }
})


module.exports = {getPeople, getPerson, test}





