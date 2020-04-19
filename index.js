// This file setup a local server for development purposes.
// It will not be deployed to AWS

const express = require('express')
const bodyParser = require('body-parser')

const CommandParser = require("./commands/command-parser").CommandParser

const app = express()
const port = 80

app.use(bodyParser.json())

app.post('/', async (req, res) => {
  try {
    const cmd = CommandParser.parse(req)
    await cmd.execute()
  } catch (e) {
    console.warn(e)
  }
  res.status(200).send({})
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
