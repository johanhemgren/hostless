const { parse } = require('tldts');
const { decrypt } = require('@architect/shared/encryption');
const { decompress } = require('@architect/shared/compression');
const { errorPage } = require('@architect/shared/errorPage')

exports.handler = async function http(req) {
  const {subdomain: remoteHost} = parse(req.headers.host);
  const decryptedString = await decrypt(req.pathParameters.dataString, remoteHost);
  const content = decompress(decryptedString);

  if (!content?.title || !content?.bodyHtml) {
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
          <title>${content?.title}</title>
        </head>
        <body>
          ${content?.bodyHtml}
        </body>
      </html>`,
  }
}
