const fs = require("fs");
const crypto = require("crypto");
const privateKeyFile = fs.readFileSync('./jotform.key', "utf8");

const decryptFormField = encrypted => {
  const key = privateKeyFile.toString();
  const buffer = Buffer.from(encrypted, "base64");
  const padding = crypto.constants.RSA_PKCS1_PADDING;
  const decrypted = crypto.privateDecrypt({ key, padding }, buffer);
  return decodeURIComponent(decrypted.toString());
};

module.exports = decryptFormField;
