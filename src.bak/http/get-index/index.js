const { html } = require('./html');
const { errorPage } = require('../../../src-es/http/get-ess/node_modules/@architect/shared/errorPage');

exports.handler = async function http(req) {
  if (req.headers.host !== process.env.HOST) {
    return errorPage;
  }

  return {
    headers: {
      'content-type': 'text/html; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    statusCode: 200,
    body: html
  }
}
