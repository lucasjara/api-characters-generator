'use strict'
const CryptoJS = require("crypto-js");
const _secretKey = '$%&ChiLoTeTeCnoLoGiaS&%$'

/**
 * 
 * @param {*} str 
 * @returns {encryptObject} {strEncrypted, iv, salt}
 */
const encryptAES256 = (str) =>{

    const salt = CryptoJS.lib.WordArray.random(16);
    const salt_hex = CryptoJS.enc.Hex.stringify(salt);
    
    const iv = CryptoJS.lib.WordArray.random(16);
    const iv_hex = CryptoJS.enc.Hex.stringify(iv);

    const key256Bits = CryptoJS.PBKDF2( _secretKey, salt, { hasher: CryptoJS.algo.SHA256, keySize: 256 / 32 , iterations: 100 });

    const encryptObject = {
        iv : iv_hex,
        salt : salt_hex,
        strEncrypted : CryptoJS.AES.encrypt(str, key256Bits, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString()
    };

    return encryptObject;
}

module.exports = {
    encryptAES256,
}