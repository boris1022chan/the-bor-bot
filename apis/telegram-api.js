const axios = require('axios')

const baseUrl = 'https://api.telegram.org/bot'
const apiToken = process.env.THEBORBOT_TELEGRAM_API

async function sendMessage(chat, message, options = {}) {
  return axios.post(`${baseUrl}${apiToken}/sendMessage`, {
    chat_id: chat,
    text: message,
    ...options
  })
}

module.exports.TelegramApi = {
  sendMessage: sendMessage
}