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
  .catch(err => console.error(err))
}) 

app.post('/users', (req, res) => {
  let { email } = req.body
  pool.query(`INSERT INTO users.userinfo (email) VALUES ('${email}')`)
  .then(response => res.send('posted'))
  .catch(err => console.error(err))
})

app.patch('/updatechecking', (req, res) => {
  let { email, deposit } = req.body
  let total;

  pool.query(`SELECT checking FROM users.userinfo WHERE email='${email}'`)
  .then(response => {
    let amount = response.rows[0]
    total = amount.checking + deposit
    pool.query(`UPDATE users.userinfo SET checking=${total} WHERE email='${email}'`)
    .then(response => res.send(response))
    .catch(err => console.error(err))
  })
  .catch(err => console.error(err))
})

app.patch('/paybills', (req, res) => {
  let { email, bills, otherEmail } = req.body
  let total;
  let total2;

  pool.query(`SELECT checking FROM users.userinfo WHERE email='${email}'`)
  .then(response => {
    let amount = response.rows[0]
    total = amount.checking - bills
    pool.query(`UPDATE users.userinfo SET checking=${total} WHERE email='${email}'`)
    .then(response => {
      pool.query(`SELECT checking FROM users.userinfo WHERE email='${otherEmail}'`)
      .then (response => {
        let amount = response.rows[0]
        total2 = amount.checking + bills
        pool.query(`UPDATE users.userinfo SET checking=${total2} WHERE email='${otherEmail}'`)
      })
      res.send(response)
    })
    .catch(err => console.error(err))
  })
  .catch(err => console.error(err))
})

app.patch('/transfertosavings', (req, res) => {
  let { email, transfer } = req.body
  let total;
  let newTotal;

  pool.query(`SELECT checking FROM users.userinfo WHERE email='${email}'`)
  .then(response => {
    let amount = response.rows[0]
    total = amount.checking - transfer
    pool.query(`UPDATE users.userinfo SET checking=${total} WHERE email='${email}'`)
    .then(response => {
      pool.query(`SELECT savings FROM users.userinfo WHERE email='${email}'`)
      .then(response => {
        let amount = response.rows[0]
        newTotal = amount.savings + transfer
        pool.query(`UPDATE users.userinfo SET savings=${newTotal} WHERE email='${email}'`)
        .then(response => res.send(response))
        .catch(err => console.error(err))
      })
      .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
  })
  .catch(err => console.error(err))
})

const port = 3000
app.listen(port, () => console.log(`Listening to port ${port}`))