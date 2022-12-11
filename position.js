const Pool = require('pg').Pool
// const pool = new Pool({
//   user: 'me',
//   host: 'localhost',
//   database: 'galaxy',
//   password: 'admin',
//   port: 5432,
// })
var mysql = require('mysql');
// const pool = mysql.createPool({
//   host     : 'localhost',
//  // port     : '3306',
//   user     : 'root',
//   password : '',
//   database : 'galaxy'

// });
const db = require('./database-config')
const pool = mysql.createPool({
    host: db.development.database.host,
    port: db.development.database.port,
    user: db.development.database.user,
    password: db.development.database.password,
    database: db.development.database.database,
    

});

const getPositions = (request, response) => {
  pool.query('SELECT * FROM position', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results)
  })
}
const createPosition = (request, response) => {
    console.log("RES", request.body);
    const { position_name,position_description } = request.body
    pool.query('INSERT INTO `position` (position_name, position_description) VALUES (?,?)', [position_name,position_description], (error, results) => {
        if (error) {
            throw error
        }
        console.log("RES", results)
        response.status(200).json(results.insertId)
    })
}


module.exports = {
    getPositions,
    createPosition
}
