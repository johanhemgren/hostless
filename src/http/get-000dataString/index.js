const { parse } = require('tldts');
const { decrypt } = require('@architect/shared/encryption');
const { decompress } = require('@architect/shared/compression');
const { errorPage } = require('@architect/shared/errorPage')

exports.handler = async function http(req) {
  const {subdomain: remoteHost} = parse(req.headers.host);
  const decryptedString = await decrypt(req.pathParameters.dataString, remoteHost);
  const {title, bodyHtml} = decompress(decryptedString);

  if (!title || !bodyHtml) {
    return errorPage;
  }

  return {
    headers: {
      'content-type': 'text/html; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    statusCode: 200,
    body: `
      <!doctype html>
      <html lang=en>
        <head>
          <meta charset=utf-8>
          <title>${title}</title>
          <link rel="stylesheet" href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css">
        </head>
        <body>
          ${bodyHtml}
        </body>
      </html>`,
  }
}

// Other example responses

/* Forward requester to a new path
exports.handler = async function http (req) {
  return {
    statusCode: 302,
    headers: {'location': '/about'}
  }
}
*/

/* Respond with successful resource creation, CORS enabled
let arc = require('@architect/functions')
exports.handler = arc.http.async (http)
async function http (req) {
  return {
    statusCode: 201,
    json: { ok: true },
    cors: true,
  }
}
*/
