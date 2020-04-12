const axios = require('axios')

async function fetchCardFromList(listId) {
  const apiKey = process.env.THEBORBOT_TRELLO_APIKEY
  const userToken = process.env.THEBORBOT_TRELLO_TOKEN
  const url = `https://api.trello.com/1/lists/${listId}/cards?key=${apiKey}&token=${userToken}`
  return axios.get(url)
    .then(res => res.data)
}

module.exports.TrelloApi = {
  fetchCurrentlyDoing: () => {
    return fetchCardFromList(process.env.THEBORBOT_DOING_LISTID)
  },

  fetchToDo: () => {
    return fetchCardFromList(process.env.THEBORBOT_TODO_LISTID)
  },

  fetchToLearn: () => {
    return fetchCardFromList(process.env.THEBORBOT_TOLEARN_LISTID)
  }
}