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

const loginUser = (request, response) => {
  const { username, password } = request.body

  const query = `SELECT * FROM user WHERE username = ?`;
  pool.query(query, [username], (err, results) => {
    console.log("RES",results);
    if (err) {
      console.error('Error executing the query: ', err);
      response.status(500).json({ message: 'Internal server error' });
      return;
    }

    // Check if the user exists
    if (results.length === 0) {
      response.status(401).json({ message: 'Invalid username or password' });
      return;
    }

    // Check if the password is correct
    const user = results[0];
    if (user.password !== password) {
      response.status(401).json({ message: 'Invalid password' });
      return;
    }

    // User authentication successful
    response.status(200).json({ message: 'Login successful', user });
  });
}

const getUsers = (request, response) => {
  pool.query('SELECT * FROM user ', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results)
  })
}
const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })
}


const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}


module.exports = {
  loginUser,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
