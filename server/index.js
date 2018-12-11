const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const { pool } = require('../database/connection.js')

const app = express()

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'dist')))

app.get('/users', (req, res) => {
  pool.query(`SELECT * FROM users.userinfo WHERE email='romang31@gmail.com'`)
  .then(response => res.send(response.rows))
}) 

const port = 3000
app.listen(port, () => console.log(`Listening to port ${port}`))