const{compress,decompress,encodeBase64,decodeBase64}=require("lzutf8"),compressString=e=>{const s=compress(JSON.stringify(e));return encodeBase64(s)},decompressString=e=>e?JSON.parse(decompress(decodeBase64(e))):null;exports.compress=compressString,exports.decompress=decompressString;
