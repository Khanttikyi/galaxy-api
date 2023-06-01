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
    pool.query('SELECT * FROM attandance where employee_id=?', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results)
    })
}
const createCheckIn = (request, response) => {
    let today = new Date().toDateString()
    const { employee_id, check_in, check_out, is_late, date } = request.body
    console.log(today, date)
    if (today == date) {
        console.log("HERE");
        response.status(400).json({
            message: 'Already Check In'
        });
    } else {
        pool.query('INSERT INTO attandance (employee_id,check_in,check_out,is_late,date) VALUES (?,?,?,?,?)', [employee_id, check_in, check_out, is_late, date], (error, results) => {
            if (error) {
                throw error
            }

            response.status(200).json(results.insertId)
        })
    }
}
const createCheckOut = (request, response) => {
    const { employee_id, check_out } = request.body
    pool.query('UPDATE attandance SET check_out=? where employee_id=?', [check_out, employee_id], (error, results) => {
        if (error) {
            throw error
        }

        response.status(200).json(employee_id)
    })
}
module.exports = {
    getAttendanceById,
    createCheckIn,
    createCheckOut
}