const validator = require('validator');
const knex = require('../database_setup/db');

const getGroceries = (async (req, res) => {
    try {


        const data = await knex('groceries').select('*').orderBy('name')
        //if table does not find record it returns a 0, this is different from invalid uuid
        if (data === 0 || data.length === 0) {
            return res.status(404).json({msg: 'No data found to update'});
        }
        // console.table(data)
        return res.status(200).json(data)
    }
    catch (e) {
        console.error(e)
        return res.status(500).json({Error: 'Internal server error'})
    }
})

const addStock = (async (req, res) => {
    const numId = Number(req.params.id);
    const id = req.params.id;
    const page = req.query.page || 0;   // normalize it with req.query.name.toLowerCase() if query is text
    const rowsPerPage = 10;
    try {

        if (!validator.isUUID(id, [4])) {
            return res.status(400).json({error: "Invalid Id"});
        }
        //we don't need to make 2 calls to the database, knex and postgres have increment, to update easily
        const data = await knex('groceries').select('*').where({id: id}).increment({stock:1}).returning('*')
        // console.log(data)
        // console.log(data[0]?.stock + 1)
        // const newStock = data[0]?.stock + 1;
        if (data === 0 || data.length === 0) {
            return res.status(404).json({msg: 'No data found to update'});
        }
        return res.status(200).json(data)
    }
    catch (e) {
        console.error(e)
        return res.status(500).json({Error: 'Internal server error'})
    }
})

const removeStock = (async (req, res) => {
    const numId = Number(req.params.id);
    const id = req.params.id;
    const page = req.query.page || 0;   // normalize it with req.query.name.toLowerCase() if query is text
    const rowsPerPage = 10;
    try {

        if (!validator.isUUID(id, [4])) {
            return res.status(400).json({error: "Invalid Id"});
        }
        //we don't need to make 2 calls to the database, knex and postgres have increment, to update easily
        const data = await knex('groceries').select('*').where({id: id}).decrement({stock:1}).returning('*')
        // console.log(data)
        // console.log(data[0]?.stock + 1)
        // const newStock = data[0]?.stock + 1;
        if (data === 0 || data.length === 0) {
            return res.status(404).json({msg: 'No data found to update'});
        }
        return res.status(200).json(data)
    }
    catch (e) {
        console.error(e)
        return res.status(500).json({Error: 'Internal server error'})
    }
})

const searchGroceries = (async (req, res) => {
      const id = req.params.id;
        let searchTerm = req.query.item;
        try {

            // console.log(searchTerm)
          const data = await knex('groceries').select('*').where('name','ILIKE', `%${searchTerm}%`)
          //if table does not find record it returns a 0, this is different from invalid uuid
          if (data === 0 || data.length === 0 ) {
            return res.status(404).json({msg: 'No data found to update'});
         }
          return res.status(200).json(data)
        } catch (e) {
          console.error(e)
          return res.status(500).json({Error: 'Internal server error'})
        }
})

module.exports = {getGroceries, addStock, searchGroceries,removeStock}