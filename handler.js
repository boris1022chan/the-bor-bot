'use strict';
const Command = require("./command").Command
const { FROM_AWS } = require("./constants")
const { bot } = require('./bot')

module.exports.handle = async event => {
  try {
    const cmd = new Command(event, FROM_AWS)
    await bot(cmd)
  } catch (e) {
    console.log(event)
    console.log(e)
  }
  return { statusCode: 200 }
};
