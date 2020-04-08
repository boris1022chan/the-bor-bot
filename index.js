const express = require('express')
const bodyParser = require('body-parser')

const Command = require("./command").Command
const { FROM_LOCAL } = require("./constants")
const { bot } = require('./bot')

const app = express()
const port = 80

app.use(bodyParser.json())

app.post('/', async (req, res) => {
  try {
    const cmd = new Command(req, FROM_LOCAL)
    await bot(cmd)
  } catch (e) {
    console.log(e)
  }
  res.status(200).send({})
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
