const h = "0123456789ABCDEF"

export const toCamelCase = str => str.split("_").reduce((ret, val) => ret += val.charAt(0).toUpperCase() + val.slice(1), "")
export const toSnakeCase = str => replace(/[A-Z]/g, str => "_" + str.toLowerCase()).replace(/^_/, "")

// Old slower implementations
// export const toHexString = bytes => bytes.reduce((str, byte) => str + byte.toString(16).toUpperCase().padStart(2, "0"), "")
// export const toBytes = hexString => new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)))

// New faster implementations
export const toHexString = bytes => { let s = ""; bytes.forEach(v => { s += h[v >> 4] + h[v & 15] }); return s; }
export const toBytes = hexString => { let l = Math.ceil(hexString.length / 2), b = new Uint8Array(l); for(let i = 0; i < l; i++) b[i] = parseInt(hexString.substr(i * 2, 2), 16); return b; }
