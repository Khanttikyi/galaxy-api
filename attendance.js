var mysql = require('mysql');
const db = require('./database-config')
const pool = mysql.createPool({
    host: db.development.database.host,
    port: db.development.database.port,
    user: db.development.database.user,
    password: db.development.database.password,
    database: db.development.database.database,

});

const getAttendanceById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM attendance where employee_id=?', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results[0])
    })
}
const createCheckIn = (request, response) => {
    console.log(request.body);
    const { employee_id, check_in, check_out, is_late } = request.body
    pool.query('INSERT INTO attendance (employee_id,check_in,check_out,is_late) VALUES (?,?,?,?)', [employee_id, check_in, check_out, is_late], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(id)
    })
}
module.exports = {
    getAttendanceById,
    createCheckIn
}