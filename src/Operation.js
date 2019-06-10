import { utils, Senders, Receivers, Changers } from "."
const { Operation } = require("../dist/proto/operation_pb")

export default class extends Operation {

    setOphash(ophash) {
        if(typeof ophash === "string" && ophash.length) {
            ophash = utils.toBytes(ophash)
        }
        super.setOphash(ophash)
    }

    setOldOphash(old_ophash) {
        if(typeof old_ophash === "string" && old_ophash.length) {
            old_ophash = utils.toBytes(old_ophash)
        }
        super.setOldOphash(old_ophash)
    }

    setPayload(payload) {
        if(typeof payload === "string" && payload.length) {
            payload = utils.toBytes(payload)
        }
        super.setPayload(payload)
    }

    setOptype(optype) {
        if(typeof optype === "string") {
           optype = Operation.Optype[optype]
        }
        super.setOptype(optype)
    }

    setSubtype(subtype) {
        if(typeof subtype === "string") {
           subtype = Operation.Subtype[subtype]
        }
        super.setSubtype(subtype)
    }

    setAmount(amount) {
        if(typeof amount !== "string") {
            amount = amount.toString()
        }
        super.setAmount(amount)
    }

    setFee(fee) {
        if(typeof fee !== "string") {
            fee = fee.toString()
        }
        super.setFee(fee)
    }

    setRpcField(field, value) {
        const method = "set" + utils.toCamelCase(field)
        this[method](value)
    }

    setRpcFields(obj) {
        for(const field in obj) {
            switch(field) {
                case "senders":
                    for(const row of obj[field]) {
                        const sender = new Senders()
                        sender.setRpcFields(row)
                        this.addSenders(sender)
                    }
                    break
                case "receivers":
                    for(const row of obj[field]) {
                        const receiver = new Receivers()
                        receiver.setRpcFields(row)
                        this.addReceivers(receiver)
                    }
                    break
                case "changers":
                    for(const row of obj[field]) {
                        const changer = new Changers()
                        changer.setRpcFields(row)
                        this.addChangers(changer)
                    }
                    break
                default:
                    this.setRpcField(field, obj[field])
                    break
            }
        }
    }
}
