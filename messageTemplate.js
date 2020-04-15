// Morning Template
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
${doing.map(x => `- ${x}`).join('\n')}

*Top 3 things to do*:
${todo.map(x => `- ${x}`).join('\n')}

*Top 2 things to learn*:
${tolearn.map(x => `- ${x}`).join('\n')}
`

module.exports.MessageTemplate = {
  morning: morningTemplate,
  morningError: morningErrorTemplate,
}
