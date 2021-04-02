const { getTxtRecord } = require('./getTxtRecord');
const { TXT_KEY_STRING } = require('./constants')

exports.getDnsPasswordString = async (hostname) => {
  let saltString = null;
  const txtRecord = await getTxtRecord(hostname);

  if (!!txtRecord && txtRecord.substr(0, TXT_KEY_STRING.length) === TXT_KEY_STRING) {
    const [_, value] = txtRecord.split('=');

    saltString = value;
  }

  return saltString;
}