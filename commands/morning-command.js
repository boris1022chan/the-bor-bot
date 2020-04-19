const TelegramApi = require("../apis/telegram-api").TelegramApi
const WeatherApi = require("../apis/weather-api").WeatherApi
const TrelloApi = require("../apis/trello-api").TrelloApi

const botChatId = process.env.THEBORBOT_MY_BOTCHAT_ID

const morningErrorTemplate = () => `
Good morning ☕!

Failed to fetch from APIs today.
`
const morningTemplate = (weather, doing, todo, tolearn) => `
Good morning ☕!

*Weather* ${weather.weather_icon}
${weather.name} has ${weather.weather_desc}
min: ${weather.temp_min}
max: ${weather.temp_max}

*Things currently working on*:
${doing.map(x => `- ${x.title}`).join('\n')}

*Top 3 things to do*:
${todo.map(x => `- ${x.title}`).join('\n')}

*Top 2 things to learn*:
${tolearn.map(x => `- ${x.title}`).join('\n')}
`

function MorningCommand() {}

MorningCommand.prototype.execute = async function() {
  let message = morningErrorTemplate()
  try {
    const [weather, currentlyDoing, toDo, toLearn] = await Promise.all([
      WeatherApi.fetchWeather(),
      TrelloApi.fetchCurrentlyDoing(),
      TrelloApi.fetchToDo(),
      TrelloApi.fetchToLearn(),
    ])
    message = morningTemplate(weather, currentlyDoing, toDo.slice(0, 3), toLearn.slice(0, 2))
  } catch (err) {
    console.warn(err)
  }
  await TelegramApi.sendMessage(
    botChatId, 
    message,
    {
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
    }
  )
}

module.exports.MorningCommand = MorningCommand
