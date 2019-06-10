const { utils, Operation } = require("..")

const operation_rpc = {
    "block": 8888,
    "time": 1473161258,
    "opblock": 0,
    "maturation": 313681,
    "optype": 1,
    "subtype": 11,
    "account": 43905,
    "signer_account": 43905,
    "n_operation": 1,
    "senders": [{
        "account": 43905,
        "n_operation": 1,
        "amount": -100.0000,
        "payload": ""
    }],
    "receivers": [{
        "account": 40511,
        "amount": 100.0000,
        "payload": ""
    }],
    "changers": [],
    "optxt": "Tx-Out 100.0000 PASC from 43905-79 to 40511-24",
    "fee": 0.0000,
    "amount": -100.0000,
    "payload": "",
    "sender_account": 43905,
    "dest_account": 40511,
    "ophash": "B822000081AB000001000000E57BDC77D77C8876F3069B829F52E01039D86B49",
    "old_ophash": "B822000081AB0000010000003032333646444430344246334637414434413042"
}

console.log(JSON.stringify(operation_rpc, null, 4))
console.log("JSON size bytes:", JSON.stringify(operation_rpc).length)
console.log("\n")

const operation_pb = new Operation()
operation_pb.setRpcFields(operation_rpc)
const operation_serialized = operation_pb.serializeBinary()

console.log(Buffer.from(operation_serialized).toString("hex"))
console.log("Protobuf size bytes:", operation_serialized.length)
console.log("\n")

const operation_deserialized = Operation.deserializeBinary(operation_serialized)
console.log("Deserialized:")
console.log(operation_deserialized.toObject())
console.log("Ophash:", utils.toHexString(operation_deserialized.getOphash()))
console.log("\n")

const ITERATIONS = 100000
const start_time = Date.now()
for(let i = 0; i < ITERATIONS; i++) {
    const operation_pb = new Operation()
    operation_pb.setRpcFields(operation_rpc)
    const operation_serialized = operation_pb.serializeBinary()
    const operation_deserialized = Operation.deserializeBinary(operation_serialized)
}
const end_time = Date.now()
console.log(ITERATIONS, "iterations took", end_time - start_time, "ms")
