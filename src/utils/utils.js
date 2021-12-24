import Cookies from "js-cookie";
const CryptoJS = require("crypto-js");

/** Store encrypted data in the cookie */
const encrypt = (text) =>
  CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
const decrypt = (data) =>
  CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);

export const getCookie = (key) => {
  const val = Cookies.get(key);
  return val !== undefined ? decrypt(val) : null;
};
export const removeCookie = (key) => {
  Cookies.remove(key);
  const val = Cookies.get(key);
  return val !== null;
};
export const setCookie = (key, value, expiration) => {
  const item = getCookie(key);
  if (item !== null) {
    removeCookie(key);
  }
  Cookies.set(key, encrypt(value), { expires: new Date(expiration) });
  return getCookie(key) !== null;
};
