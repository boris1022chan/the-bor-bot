const TelegramApi = require("../apis/telegram-api").TelegramApi

const messageTemplate = (name) => `
Thank you for chating with me, ${name}, but I am too dumb to reply.
`

function FailToChatCommand(messageInfo) {
  this.messageInfo = messageInfo
}

FailToChatCommand.prototype.execute = async function() {
  const message = messageTemplate(this.messageInfo.name)
  await TelegramApi.sendMessage(this.messageInfo.chatId, message)
}

module.exports.FailToChatCommand = FailToChatCommand
