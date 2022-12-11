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

const getDepartments = (request, response) => {
  pool.query('SELECT * FROM department ', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results)
  })
}
const createDepartment = (request, response) => {
    console.log("RES", request.body);
    const { department_name,department_description } = request.body
    pool.query('INSERT INTO department (department_name, description,user_id) VALUES (?,?,?)', [department_name,department_description,'1'], (error, results) => {
        if (error) {
            throw error
        }
        console.log("RES", results)
        response.status(200).json(results.insertId)
    })
}

module.exports = {
    getDepartments,
    createDepartment
}
