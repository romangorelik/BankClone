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
  let { email } = req.query
  console.log(email)
  pool.query(`SELECT checking FROM users.userinfo WHERE email='${email}'`)
  .then(response => {
    res.send(response.rows[0])
  })
  .catch(err => console.error(err))
}) 

app.get('/savings', (req, res) => {
  let { email } = req.query
  pool.query(`SELECT savings FROM users.userinfo WHERE email='${email}'`)
  .then(response => res.send(response.rows[0]))
}) 

app.post('/users', (req, res) => {
  let { email } = req.body
  pool.query(`INSERT INTO users.userinfo (email) VALUES ('${email}')`)
  .then(response => res.send('posted'))
  .catch(err => console.error(err))
})

const port = 3000
app.listen(port, () => console.log(`Listening to port ${port}`))