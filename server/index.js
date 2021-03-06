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

// let formatDate = (date) => {
//   var monthNames = [
//     "January", "February", "March",
//     "April", "May", "June", "July",
//     "August", "September", "October",
//     "November", "December"
//   ];

//   var day = date.getDate();
//   var monthIndex = date.getMonth();
//   var year = date.getFullYear();

//   return day + ' ' + monthNames[monthIndex] + ' ' + year;
// }

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

app.get('/history', (req, res) => {
  let { email } = req.query
  pool.query(`SELECT history FROM users.userinfo WHERE email='${email}'`)
  .then(response => {
    res.send(response.rows[0].history)
  })
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
  let date = new Date();

  pool.query(`SELECT checking FROM users.userinfo WHERE email='${email}'`)
  .then(response => {
    let amount = response.rows[0]
    total = amount.checking + deposit
    pool.query(`UPDATE users.userinfo SET checking=${total} WHERE email='${email}'`)
    .then(response => {
      pool.query(`UPDATE users.userinfo SET history = array_prepend('Deposited ${deposit} into checking account!${date}', history) WHERE email='${email}'`)
      res.send(response)
    })
    .catch(err => console.error(err))
  })
  .catch(err => console.error(err))
})

app.patch('/updatesavings', (req, res) => {
  let { email, deposit } = req.body
  let total;
  let date = new Date();

  pool.query(`SELECT savings FROM users.userinfo WHERE email='${email}'`)
  .then(response => {
    let amount = response.rows[0]
    total = amount.savings + deposit
    pool.query(`UPDATE users.userinfo SET savings=${total} WHERE email='${email}'`)
    .then(response => {
      pool.query(`UPDATE users.userinfo SET history = array_prepend('Deposited ${deposit} into savings account!${date}', history) WHERE email='${email}'`)
      res.send(response)
    })
    .catch(err => console.error(err))
  })
  .catch(err => console.error(err))
})

app.patch('/paybills', (req, res) => {
  let { email, bills, otherEmail } = req.body
  let total;
  let total2;
  let date = new Date();

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
        .then(response => {
          pool.query(`UPDATE users.userinfo SET history = array_prepend('Paid ${bills} to ${otherEmail}!${date}', history) WHERE email='${email}'`)
          pool.query(`UPDATE users.userinfo SET history = array_prepend('Received ${bills} from ${email}!${date}', history) WHERE email='${otherEmail}'`)
          res.send(response)
        })

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
  let date = new Date();

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
        .then(response => {
          pool.query(`UPDATE users.userinfo SET history = array_prepend('Transfered ${transfer} from checking account to savings account!${date}', history) WHERE email='${email}'`)
          res.send(response)
        })
        .catch(err => console.error(err))
      })
      .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
  })
  .catch(err => console.error(err))
})

app.patch('/transfertochecking', (req, res) => {
  let { email, transfer } = req.body
  let total;
  let newTotal;
  let date = new Date();

  pool.query(`SELECT savings FROM users.userinfo WHERE email='${email}'`)
  .then(response => {
    let amount = response.rows[0]
    total = amount.savings - transfer
    pool.query(`UPDATE users.userinfo SET savings=${total} WHERE email='${email}'`)
    .then(response => {
      pool.query(`SELECT checking FROM users.userinfo WHERE email='${email}'`)
      .then(response => {
        let amount = response.rows[0]
        newTotal = amount.checking + transfer
        pool.query(`UPDATE users.userinfo SET checking=${newTotal} WHERE email='${email}'`)
        .then(response => {
          pool.query(`UPDATE users.userinfo SET history = array_prepend('Transfered ${transfer} from savings account to checking account!${date}', history) WHERE email='${email}'`)
          res.send(response)
        })
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