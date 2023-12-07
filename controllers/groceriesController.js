const validator = require('validator');
const knex = require('../database_setup/db');

const getGroceries = (async (req, res) => {
        try {


          const data = await knex('groceries').select('*')
          //if table does not find record it returns a 0, this is different from invalid uuid
          if (data === 0 || data.length === 0 ) {
            return res.status(404).json({msg: 'No data found to update'});
         }
          console.table(data)
          return res.status(200).json(data)
        } catch (e) {
          console.error(e)
          return res.status(500).json({Error: 'Internal server error'})
        }
})

module.exports = {getGroceries}