import { utils } from "."
const { Changers } = require("../dist/proto/changers_pb")

export default class extends Changers {

    setNewEncPubkey(new_enc_pubkey) {
        if(typeof new_enc_pubkey === "string" && new_enc_pubkey.length) {
            new_enc_pubkey = utils.toBytes(new_enc_pubkey)
        }
        super.setNewEncPubkey(new_enc_pubkey)
    }

    setFee(fee) {
        if(typeof fee !== "string") {
            fee = fee.toString()
        }
        super.setFee(fee)
    }

    setAccountPrice(account_price) {
        if(typeof account_price !== "string") {
            account_price = account_price.toString()
        }
        super.setAccountPrice(account_price)
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
