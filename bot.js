const axios = require('axios')

const { 
  CRON_TYPE,
  CHAT_TYPE
} = require("./constants")

const baseUrl = 'https://api.telegram.org/bot'
const botChatId = process.env.THEBORBOT_MY_BOTCHAT_ID
const apiToken = process.env.THEBORBOT_TELEGRAM_API

exports.bot = async cmd => {
  if (cmd.type === CRON_TYPE) {
    await handleCron(cmd)
  } else if (cmd.type === CHAT_TYPE) {
    await handleChat(cmd)
  }
}

async function handleCron(cmd) {
  switch(cmd.command) {
    case "daily-reminder":
      await sendMessage(botChatId, "Good morning!"); break
    default:
      console.log(`unregonized cron command ${cmd.command}`)
  }
}

async function handleChat(cmd) {
  const message = cmd.body.message
  const chatId = message.chat.id
  const name = message.from.first_name

  switch(cmd.command) {
    case "/start":
      await sendMessage(chatId, `Hello, ${name} 👋`); break
    default:
      await sendMessage(chatId, "Sorry, I don't understand")
  }
}

async function sendMessage(chat, message) {
  await axios.post(`${baseUrl}${apiToken}/sendMessage`, {
    chat_id: chat,
    text: message,
  })
}
