// Morning Template
const morningErrorTemplate = () => `
Good morning ☕!

Failed to fetch your todos today.
`

const morningTemplate = (doing, todo, tolearn) => `
Good morning ☕!

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
