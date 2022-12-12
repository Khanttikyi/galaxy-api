var mysql = require('mysql');
const db = require('./database-config')
const pool = mysql.createPool({
    host: db.development.database.host,
    port: db.development.database.port,
    user: db.development.database.user,
    password: db.development.database.password,
    database: db.development.database.database,

});
const getEmployee = (request, response) => {
    pool.query('SELECT * FROM employee ', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results)
    })
}
const getEmployeeById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM employee WHERE employee_id = ?', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results[0])
    })
}

const createEmployee = (request, response) => {
    console.log("RES", request.body);
    const { employee_id, employee_name, employee_position, employee_department, employee_salary, employee_join_date, employee_status, employee_email, employee_phone, employee_nrc, employee_dob, employee_gender, employee_father_name, employee_address } = request.body
    pool.query('INSERT INTO employee (employee_id, employee_name, employee_position,employee_department, employee_salary, employee_join_date, employee_status, employee_email, employee_phone, employee_nrc, employee_dob, employee_gender, employee_father_name, employee_address) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [employee_id, employee_name, employee_position, employee_department, employee_salary, employee_join_date, employee_status, employee_email, employee_phone, employee_nrc, employee_dob, employee_gender, employee_father_name, employee_address], (error, results) => {
        if (error) {
            throw error
        }
        console.log("RES", results)
        response.status(200).json(results.insertId)
    })
}
// pool.query('INSERT INTO employee (name, email) VALUES ($1, $2) RETURNING *', [name, email],

const updateEmployee = (request, response) => {
    const id = parseInt(request.params.id)
    console.log("RES", request.body);
    const { employee_id, employee_name, employee_position, employee_department, employee_salary, employee_join_date, employee_status, employee_email, employee_phone, employee_nrc, employee_dob, employee_gender, employee_father_name, employee_address } = request.body
    pool.query('UPDATE employee SET employee_id=?, employee_name=?, employee_position=?,employee_department=?, employee_salary=?, employee_join_date=?, employee_status=?, employee_email=?, employee_phone=?, employee_nrc=?, employee_dob=?, employee_gender=?, employee_father_name=?, employee_address=? WHERE employee_id = ?', [employee_id, employee_name, employee_position, employee_department, employee_salary, employee_join_date, employee_status, employee_email, employee_phone, employee_nrc, employee_dob, employee_gender, employee_father_name, employee_address, id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(id)
    }
    )
}

const deleteEmployee = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM employee WHERE employee_id = ?', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(id)
    })
}

const searchEmployee = (request, response) => {
    const employee_status = parseInt(request.params.employee_status)
    const employee_name = parseInt(request.params.employee_name)
    const employee_department = parseInt(request.params.employee_department)
    pool.query('SELECT * FROM employee WHERE employee_status = ?', [employee_status], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results)
    })
}


module.exports = {
    getEmployee,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    searchEmployee,
}
