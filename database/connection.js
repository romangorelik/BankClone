const { Pool } = require('pg')

let config = {
  host: 'localhost',
  user: 'roman.gorelik',
  database: 'bankclone'
}

let pool = new Pool(config)

exports.pool = pool
