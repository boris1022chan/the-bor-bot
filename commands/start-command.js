const TelegramApi = require("../apis/telegram-api").TelegramApi

function StartCommand(messageInfo) {
  this.messageInfo = messageInfo
}

StartCommand.prototype.execute = async function() {
  await TelegramApi.sendMessage(this.messageInfo.chatId, `Hello, ${this.messageInfo.name} 👋`)
}

module.exports.StartCommand = StartCommand
