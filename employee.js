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
    const employee_status = request.query.employee_status
    const employee_name = request.query.employee_name
    const employee_department = request.query.employee_department
    console.log(`SELECT * FROM employee where ${employee_name ? 'employee_name=?' : ''}${employee_name && employee_department ? 'AND ' : ''}${employee_department ? 'employee_department=?' : ''}${(employee_name || employee_department) && employee_status ? 'AND ' : ''}${employee_status ? 'employee_status=?' : ''}`)
    let query = 'SELECT * FROM employee '
    let value;

    if (employee_name && employee_status && employee_department) {
        query = query + 'where employee_name=? AND employee_status=? AND employee_department=?'
        value = [employee_name, employee_status, employee_department]
    }

    else if (employee_name && employee_status) {
        query = query + 'where employee_name=? AND employee_status=?'
        value = [employee_name, employee_status]
    }
    else if (employee_name && employee_department) {
        query = query + 'where employee_name=? AND employee_department=?'
        value = [employee_name, employee_department]
    }
    else if (employee_status && employee_department) {
        query = query + 'where employee_status=? AND employee_department=?'
        value = [employee_status, employee_department]
    }
    else if (employee_name) {
        query = query + 'where employee_name=?'
        value = [employee_name]
    }
    else if (employee_status) {
        query = query + 'where employee_status=?'
        value = [employee_status]
    }
    else if (employee_department) {
        query = query + 'where employee_department=?'
        value = [employee_department]
    }
    else{
        
    }
    pool.query(query, value, (error, results) => {
        console.log("result", results)
        if (error) {
            throw error
        }
        response.status(200).json(results)
    })
    // pool.query('SELECT * FROM employee WHERE employee_status = ?', [employee_status], (error, results) => {
    //     if (error) {
    //         throw error
    //     }
    //     response.status(200).json(results)
    // })
}


module.exports = {
    getEmployee,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    searchEmployee,
}
