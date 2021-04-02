const dnsPromises = require('dns').promises;

const getTxtRecord = async (hostname) => {
  const [[txtRecord]] = await dnsPromises.resolve(hostname, 'TXT');

  return txtRecord;
}

exports.getTxtRecord = getTxtRecord;