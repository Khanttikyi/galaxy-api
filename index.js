const express = require('express')
const cors = require("cors");
const bodyParser = require('body-parser')
const mysql = require('mysql')
const app = express()
const db = require('./user')
const employee = require('./employee')
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
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

// EMPLOYEE
app.get('/getEmployee',employee.getEmployee)
app.get('/employee/:id',employee.getEmployeeById)
app.post('/employee', employee.createEmployee)
app.put('/employee/:id', employee.updateEmployee)
app.delete('/employee/:id', employee.deleteEmployee)
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})