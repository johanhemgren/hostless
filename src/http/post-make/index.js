const { encrypt, setPassword } = require('@architect/shared/encryption')
const { compress } = require('@architect/shared/compression')

const getPostedData = (requestBody) => {
  const dataJson = Buffer.from(requestBody, 'base64').toString('ascii');

  return JSON.parse(dataJson);
}

const escapeHtml = string => string.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');

exports.handler = async function http(req) {
  // if (req.headers.host !== process.env.HOST) {
  //   return {
  //     headers: {'content-type': 'text/html; charset=utf8'},
  //     statusCode: 404,
  //     body: error
  //   };
  // }

  const {title, hostUrl, bodyHtml, preferedPassword} = getPostedData(req.body);
  const inputPassword = preferedPassword !== '' ? preferedPassword : null;
  const hostname = hostUrl.replace(/(^\w+:|^)\/\//, '');
  const compressedHtml = compress({title, bodyHtml}, hostname);
  const password = setPassword(inputPassword);
  const encryptedString = await encrypt(compressedHtml, hostname, password);
  const url = `http://${hostname}.hos.tl:3333/${encodeURIComponent(encryptedString)}`;

  return {
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    statusCode: 200,
    body: JSON.stringify({
      html: `
      <p class="mb-3">Add this as a TXT-record to your domains DNS:</p>
      <code class="inline-block p-4 mb-1 rounded border border-indigo-600 bg-indigo-100 ">"hostl=${escapeHtml(password)}"</code>
      <p class="mb-6 text-sm text-gray-500">Don't forget to include the double quotes</p>
      
      <p class="mb-3">...and the following as a CNAME-record:</p>
      <code class="inline-block p-4 mb-6 rounded border border-indigo-600 bg-indigo-100 ">${hostname}</code>

      <p class="mb-3">When this is done you can access the site here:</p>
      <a class="inline-block p-4 bg-indigo-500 text-white rounded" href="${url}" target="_blank">${title}</a>
      `
    }),
  }
}
