const axios = require('axios')

const { 
  CRON_TYPE,
  CHAT_TYPE
} = require("./constants")
const WeatherApi = require("./weatherApi").WeatherApi
const TrelloApi = require("./trelloApi").TrelloApi
const MessageTemplate = require("./messageTemplate").MessageTemplate

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
      await morningMessage(botChatId); break
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
    case "/test":
      await morningMessage(botChatId); break
    default:
      await sendMessage(chatId, "Sorry, I don't understand")
  }
}

async function sendMessage(chat, message, options = {}) {
  await axios.post(`${baseUrl}${apiToken}/sendMessage`, {
    chat_id: chat,
    text: message,
    ...options
  })
}

async function morningMessage(chatId) {
  let error = false
  const [weather, currentlyDoing, toDo, toLearn] = await Promise.all([
    WeatherApi.fetchWeather(),
    TrelloApi.fetchCurrentlyDoing()
      .then(cards => cards.map(c => c.name)),
    TrelloApi.fetchToDo()
      .then(cards => cards.slice(0, 3).map(c => c.name)),
    TrelloApi.fetchToLearn()
      .then(cards => cards.slice(0, 2).map(c => c.name)),
  ]).catch(err => { console.log(err); error = true })
  
  if (error) {
    return sendMessage(chatId, MessageTemplate.morningError())
  }
  return sendMessage(
    chatId, 
    MessageTemplate.morning(weather, currentlyDoing, toDo, toLearn),
    {
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
    })
}
