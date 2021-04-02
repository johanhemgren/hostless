const { errorPage } = require('../../../src-es/http/get-ess/node_modules/@architect/shared/errorPage')

exports.handler = async function http() {
  return errorPage
}
