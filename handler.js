'use strict';
const CommandParser = require("./commands/command-parser").CommandParser

module.exports.handle = async event => {
  try {
    const cmd = CommandParser.parse(event)
    await cmd.execute()
  } catch (e) {
    console.warn(e)
  }
  return { statusCode: 200 }
};
