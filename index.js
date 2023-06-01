const express = require('express')
const cors = require("cors");
const bodyParser = require('body-parser')
const mysql = require('mysql')
const app = express()
const db = require('./user')
const employee = require('./employee')
const department = require('./department')
const position = require('./position')
const attendance = require('./attendance')
app.use(cors());
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

// USER
app.post('/loginUser', db.loginUser)
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

// EMPLOYEE
app.get('/getEmployee', employee.getEmployee)
app.get('/employee/:id', employee.getEmployeeById)
app.post('/employee', employee.createEmployee)
app.put('/employee/:id', employee.updateEmployee)
app.delete('/employee/:id', employee.deleteEmployee)
app.get('/searchEmployee/', employee.searchEmployee)
app.get('/employee/searchEmployee/:employee_status/:employee_name/:employee_department', employee.searchEmployee)

//Department
app.get('/getDepartments', department.getDepartments)
app.post('/department', department.createDepartment)
//Position
app.get('/getPositions', position.getPositions)
app.post('/position', position.createPosition)
//ATTENDANCE
app.get('/getAttendance/:id', attendance.getAttendanceById)
app.post('/createCheckIn', attendance.createCheckIn)
app.post('/createCheckOut', attendance.createCheckOut)
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})