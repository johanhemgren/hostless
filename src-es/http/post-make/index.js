import { HOST, TXT_KEY_STRING } from '@architect/shared/constants'
import { encrypt, setPassword } from '@architect/shared/encryption'
import { compress } from '@architect/shared/compression'
import { errorPage } from '@architect/shared/errorPage'

const getPostedData = (requestBody) => {
  if (!requestBody) {
    return;
  }
  
  return JSON.parse(
    process.env.NODE_ENV !== 'testing' 
      ? requestBody 
      : Buffer.from(requestBody, 'base64').toString('ascii')
  );
}

const escapeHtml = string => string.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');

exports.handler = async function http(req) {
  return {
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Methods': 'GET, POST',
      'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization, Origin, Accept'
      // 'set-cookie': 'fiz=buz',
    },
    statusCode: 200,
    body: JSON.stringify({ok: 'WORKS'}),
  }

  // const requestBody = getPostedData(req.body);

  // if (!requestBody?.title || !requestBody?.hostUrl || !requestBody?.bodyHtml) {
  //   return errorPage;
  // }

  // const {title, hostUrl, bodyHtml, preferedPassword} = requestBody;
  // const inputPassword = (preferedPassword && preferedPassword !== '') ? preferedPassword : null;
  // const hostname = hostUrl.replace(/(^\w+:|^)\/\//, '');
  // const compressedHtml = compress({title, bodyHtml}, hostname);
  // const password = setPassword(inputPassword);
  // const txtRecord = `"${TXT_KEY_STRING}=${escapeHtml(password)}"`;
  // const encryptedString = await encrypt(compressedHtml, hostname, password);
  // const urlBase = `http://${hostname}.${HOST}/ess`;
  // const url = `${urlBase}/${encodeURIComponent(encryptedString)}`;

  // return {
  //   cors: true,
  //   type: 'application/json',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': 'http://localhost:3000',
  //     'Access-Control-Allow-Methods': 'GET, POST',
  //     'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization, Origin, Accept'
  //     // 'set-cookie': 'fiz=buz',
  //   },
  //   statusCode: 200,
  //   body: JSON.stringify({
  //     urlBase,
  //     url,
  //     txtRecord
  //   }),
  // }
}
