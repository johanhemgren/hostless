const { errorPage } = require('@architect/shared/errorPage')

exports.handler = async function http() {
  return errorPage
}
