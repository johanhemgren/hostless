const { HOST, TXT_KEY_STRING } = require('@architect/shared/constants')
const { encrypt, setPassword } = require('@architect/shared/encryption')
const { compress } = require('@architect/shared/compression')

const getPostedData = (requestBody) => {
  console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
  console.log('requestBody: ', requestBody);
  
  return JSON.parse(
    process.env.NODE_ENV !== 'testing' 
      ? requestBody 
      : Buffer.from(requestBody, 'base64').toString('ascii')
  );
}

const escapeHtml = string => string.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');

exports.handler = async function http(req) {
  console.log(req);
  
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
  const txtRecord = `"${TXT_KEY_STRING}=${escapeHtml(password)}"`;
  const encryptedString = await encrypt(compressedHtml, hostname, password);
  const urlBase = `http://${hostname}.${HOST}/ess`;
  const url = `${urlBase}/${encodeURIComponent(encryptedString)}`;

  return {
    cors: true,
    type: 'application/json',
    statusCode: 200,
    body: JSON.stringify({
      urlBase,
      url,
      txtRecord
    }),
  }
}
