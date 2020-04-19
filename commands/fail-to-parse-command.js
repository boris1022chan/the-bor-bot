const TelegramApi = require("../apis/telegram-api").TelegramApi

const messageTemplate = () => `
Sorry, my head is spinning like crazy rn.
`

function FailToParseCommand(messageInfo) {
  this.messageInfo = messageInfo
}

FailToParseCommand.prototype.execute = async function() {
  const message = messageTemplate()
  await TelegramApi.sendMessage(this.messageInfo.chatId, message)
}

module.exports.FailToParseCommand = FailToParseCommand
