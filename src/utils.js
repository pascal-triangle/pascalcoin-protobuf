export const toCamelCase = str => str.split("_").reduce((ret, val) => ret += val.charAt(0).toUpperCase() + val.slice(1), "")
export const toSnakeCase = str => replace(/[A-Z]/g, str => "_" + str.toLowerCase()).replace(/^_/, "")
export const toHexString = bytes => bytes.reduce((str, byte) => str + byte.toString(16).toUpperCase().padStart(2, "0"), "")
export const toBytes = hexString => new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)))
