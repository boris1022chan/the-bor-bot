const {
  FROM_LOCAL,
  CRON_TYPE,
  CHAT_TYPE,
} = require("./constants")

function findType(obj) {
  if (obj.type === CRON_TYPE) {
    return CRON_TYPE
  }
  return CHAT_TYPE
}

function findBody(obj, src, type) {
  if (src === FROM_LOCAL) {
    return obj.body
  }
  if (type === CRON_TYPE) {
    return null
  }
  return JSON.parse(obj.body)
}

function findText(body, type) {
  if (type === CRON_TYPE) {
    return null
  }
  return body.message.text
}

function findCommand(obj, body, type, src) {
  if (type === CRON_TYPE) {
    return obj.job
  }
  const text = body.message.text
  if (text.startsWith("/start"))
    return "/start"
  else if (src === FROM_LOCAL && text.startsWith("/test"))
    return "/test"
  return null
}

function Command(obj, src) {
  this.type = findType(obj)
  this.body = findBody(obj, src, this.type)
  this.text = findText(this.body, this.type)
  this.command = findCommand(obj, this.body, this.type, src)
}

module.exports.Command = Command
