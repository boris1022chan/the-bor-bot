const FailToChatCommand = require("./fail-to-chat-command").FailToChatCommand
const FailToParseCommand = require("./fail-to-parse-command").FailToParseCommand
const MorningCommand = require("./morning-command").MorningCommand
const StartCommand = require("./start-command").StartCommand

const devEnv = process.env.LOCAL ? true : false

function MessageInfo(body) {
  this.message = body.message,
  this.chatId = body.message.chat.id
  this.name = body.message.from.first_name
  this.text = body.message.text
}

function CommandParser() {}

CommandParser.parse = (obj) => {
  if (obj.type === "cron") {
    switch (obj.job) {
      case "daily-reminder":
        return new MorningCommand()
      default:
        throw new Error(`Cannot parse cron job ${obj.job}`)
    }
  }
  
  const body = process.env.LOCAL ? obj.body : JSON.parse(obj.body)
  const messageInfo = new MessageInfo(body)
  const text = messageInfo.text
  if (!text.startsWith("/"))
    return new FailToChatCommand(messageInfo)
  else if (text.startsWith("/start"))
    return new StartCommand(messageInfo)
  else if (devEnv && text.startsWith("/test"))
    return new MorningCommand() // replace for testing purpose only
  else 
    return new FailToParseCommand(messageInfo)
}

module.exports.CommandParser = CommandParser
