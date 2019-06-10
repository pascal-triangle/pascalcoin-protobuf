import { utils } from "."
const { Account } = require("../dist/proto/account_pb")

export default class extends Account {

    setEncPubkey(enc_pubkey) {
        if(typeof enc_pubkey === "string" && enc_pubkey.length) {
            enc_pubkey = utils.toBytes(enc_pubkey)
        }
        super.setEncPubkey(enc_pubkey)
    }

    setState(state) {
        if(typeof state === "string") {
            state = Account.State[state]
        }
        super.setState(state)
    }

    setPrice(price) {
        if(typeof price !== "string") {
            price = price.toString()
        }
        super.setPrice(price)
    }

    setBalance(balance) {
        if(typeof balance !== "string") {
            balance = balance.toString()
        }
        super.setBalance(balance)
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
