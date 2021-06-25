'use strict'

const {db} = require('./server/db')
const app = require('./server')
const socket = require('socket.io');
const PORT = process.env.PORT || 8080

const server = db.sync() // if you update your db schemas, make sure you drop the tables first and then recreate them
  .then(() => {
    console.log('db synced')
    app.listen(PORT, () => console.log(`listening on port ${PORT}`))
  })

