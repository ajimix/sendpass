#!/usr/bin/env node
const CryptoJS = require('crypto-js');
const copyPaste = require('copy-paste');
const args = process.argv.slice(2);
let value = args[0];
let secret = args[1];
let action = args[2] || 'encrypt';

if (value === undefined || secret === undefined) {
  console.error('Please provide a string as the first parameter:\nExample encrypt: sendpass someString someSecret\nExample decrypt: sendpass someString someSecret decrypt');
  process.exit(1);
}

let result;
if (action === 'encrypt') {
  result = CryptoJS.AES.encrypt(value, secret);
} else {
  var bytes  = CryptoJS.AES.decrypt(value, secret);
  result = bytes.toString(CryptoJS.enc.Utf8);
}

copyPaste.copy(result.toString(), () => {
  console.log('String pasted to your clipboard');
  process.exit(0);
});
