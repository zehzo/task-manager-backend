const express = require('express')
const dotenv = require('dotenv')

const connectToDatabase = require('./src/database/mongoose.database')
dotenv.config()
const app = express()

connectToDatabase();
app.get('/', (req, res) => {
  res.status(200).send("Hello World")
})

const port = 8000
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})