import { utils } from "."
const { Receivers } = require("../dist/proto/receivers_pb")

export default class extends Receivers {

    setAmount(amount) {
        if(typeof amount !== "string") {
            amount = amount.toString()
        }
        super.setAmount(amount)
    }

    setPayload(payload) {
        if(typeof payload === "string" && payload.length) {
            payload = utils.toBytes(payload)
        }
        super.setPayload(payload)
    }

    setRpcField(field, value) {
        const method = "set" + utils.toCamelCase(field)
        this[method](value)
    }

    setRpcFields(obj) {
        for(const field in obj) {
            this.setRpcField(field, obj[field])
        }
    }
}
