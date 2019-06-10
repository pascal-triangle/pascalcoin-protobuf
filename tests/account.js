const { utils, Account } = require("..")

const account_rpc = {
    "account": 1002,
    "enc_pubkey": "CA0220001C0073E3793283C7ECBF9ABA90666B52649EFC3080881CB1925F75D6B24037ED2000942133FC0103004B3BA69107328E0A0F42E67EC550978422DECC61F62275A7BB",
    "balance": 39284.2105,
    "n_operation": 13,
    "updated_b": 319829,
    "state": "normal",
    "name": "pascalcoin-foundation-opex-spain",
    "type": 0
}

console.log(JSON.stringify(account_rpc, null, 4))
console.log("JSON size bytes:", JSON.stringify(account_rpc).length)
console.log("\n")

const account_pb = new Account()
account_pb.setRpcFields(account_rpc)
const account_serialized = account_pb.serializeBinary()

console.log(Buffer.from(account_serialized).toString("hex"))
console.log("Protobuf size bytes:", account_serialized.length)
console.log("\n")

const account_deserialized = Account.deserializeBinary(account_serialized)
console.log("Deserialized:")
console.log(account_deserialized.toObject())
console.log("EncPubkey:", utils.toHexString(account_deserialized.getEncPubkey()))
console.log("\n")

const ITERATIONS = 100000
const start_time = Date.now()
for(let i = 0; i < ITERATIONS; i++) {
    const account_pb = new Account()
    account_pb.setRpcFields(account_rpc)
    const account_serialized = account_pb.serializeBinary()
    const account_deserialized = Account.deserializeBinary(account_serialized)
}
const end_time = Date.now()
console.log(ITERATIONS, "iterations took", end_time - start_time, "ms")
