const axios = require('axios')

const TrelloList = {
  "Doing": process.env.THEBORBOT_DOING_LISTID,
  "Things To Do": process.env.THEBORBOT_TODO_LISTID,
  "Things To Learn": process.env.THEBORBOT_TOLEARN_LISTID,
}

function TrelloCardDTO(list) {
  this.title = list.name
  this.url = list.shortUrl
}

async function fetchCardsFromList(listId) {
  const apiKey = process.env.THEBORBOT_TRELLO_APIKEY
  const userToken = process.env.THEBORBOT_TRELLO_TOKEN
  const url = `https://api.trello.com/1/lists/${listId}/cards?key=${apiKey}&token=${userToken}`
  return axios.get(url)
    .then(res => res.data)
    .then(data => data.map(c => new TrelloCardDTO(c)))
}

module.exports.TrelloApi = {
  fetchCurrentlyDoing: () => fetchCardsFromList(TrelloList["Doing"]),
  fetchToDo: () => fetchCardsFromList(TrelloList["Things To Do"]),
  fetchToLearn: () => fetchCardsFromList(TrelloList["Things To Learn"]),
}