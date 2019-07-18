import { utils } from "."
const { Block } = require("../dist/proto/block_pb")

export default class extends Block {

    setEncPubkey(enc_pubkey) {
        if(typeof enc_pubkey === "string" && enc_pubkey.length) {
            enc_pubkey = utils.toBytes(enc_pubkey)
        }
        super.setEncPubkey(enc_pubkey)
    }

    setReward(reward) {
        if(typeof reward !== "string") {
            reward = reward.toString()
        }
        super.setReward(reward)
    }

    setFee(fee) {
        if(typeof fee !== "string") {
            fee = fee.toString()
        }
        super.setFee(fee)
    }

    setSbh(sbh) {
        if(typeof sbh === "string" && sbh.length) {
            sbh = utils.toBytes(sbh)
        }
        super.setSbh(sbh)
    }

    setOph(oph) {
        if(typeof oph === "string" && oph.length) {
            oph = utils.toBytes(oph)
        }
        super.setOph(oph)
    }

    setPow(pow) {
        if(typeof pow === "string" && pow.length) {
            pow = utils.toBytes(pow)
        }
        super.setPow(pow)
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

    static deserializeToObj(binary) {
        const deserialized = super.deserializeBinary(binary)
        let obj = deserialized.toObject()
        obj.encPubkey = utils.toHexString(deserialized.getEncPubkey())
        obj.sbh = utils.toHexString(deserialized.getSbh())
        obj.oph = utils.toHexString(deserialized.getOph())
        obj.pow = utils.toHexString(deserialized.getPow())
        return obj
    }
}
