const {compress, decompress, encodeBase64, decodeBase64} = require('lzutf8');

const compressString = (string) => {
  const compressed = compress(JSON.stringify(string));

  return encodeBase64(compressed);
}

const decompressString = (base64) => {
  if (!base64) {
    return null;
  }

  return JSON.parse(decompress(decodeBase64(base64)));
}

exports.compress = compressString;
exports.decompress = decompressString;