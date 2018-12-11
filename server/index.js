const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const { pool } = require('../database/connection.js')

const app = express()

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 
}

app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use(express.static(path.join(__dirname, 'dist')))

app.get('/checking', (req, res) => {
  pool.query(`SELECT checking FROM users.userinfo WHERE email='romang31@gmail.com'`)
  .then(response => res.send(response.rows[0]))
}) 

app.get('/savings', (req, res) => {
  pool.query(`SELECT savings FROM users.userinfo WHERE email='romang31@gmail.com'`)
  .then(response => res.send(response.rows[0]))
}) 

const port = 3000
app.listen(port, () => console.log(`Listening to port ${port}`))