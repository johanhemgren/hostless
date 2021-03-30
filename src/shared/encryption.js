const {
  createHash, 
  createCipheriv, 
  createDecipheriv,
  randomBytes,
} = require('crypto');
const { getDnsPasswordString } = require('./getDnsPasswordString');
const { ENCRYPTION_ALGORITHM, IV_LENGTH } = require('./constants');

const generatePassword = (length=32) => {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&\'()*+,-./:;<>?@[\]^_`{|}~'; // = was left out
  const passwordArray = Array(length).fill(0);

  return passwordArray.reduce((acc) => `${acc}${characters[parseInt(Math.random() * (characters.length))]}`, '');
}

const setPassword = (prefered) => {
  if (prefered && prefered.trim() !== '' && prefered.length >= 8) {
    return prefered;
  }

  return generatePassword(32);
}

const getHash = async (hostname, password=null) => {
  if (!hostname) return null;

  const hash = createHash('sha256');
  const saltString = password || await getDnsPasswordString(hostname);

  hash.update(process.env.HASH + hostname + saltString);

  return hash.digest('hex').substr(0, 32);
}

const encryptData = async (data, hostname, password) => {
  if (!data || !hostname) return null;

  const iv = randomBytes(IV_LENGTH);
  const hash = await getHash(hostname, password);
  const cipher = createCipheriv(ENCRYPTION_ALGORITHM, Buffer.from(hash), iv);
  
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

const decryptString = async (encryptedString, hostname) => {
  const hash = await getHash(hostname);

  if (!hash) {
    return null;
  }

  const textParts = encryptedString.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = createDecipheriv(ENCRYPTION_ALGORITHM, Buffer.from(hash), iv);
  
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

exports.setPassword = setPassword;
exports.encrypt = encryptData;
exports.decrypt = decryptString;