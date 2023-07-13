import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const init_arg_to_mich = (beneficiary: att.Address): att.Micheline => {
    return beneficiary.to_mich();
}
export class Payment_with_fees {
    address: string | undefined;
    constructor(address: string | undefined = undefined) {
        this.address = address;
    }
    get_address(): att.Address {
        if (undefined != this.address) {
            return new att.Address(this.address);
        }
        throw new Error("Contract not initialised");
    }
    async get_balance(): Promise<att.Tez> {
        if (null != this.address) {
            return await ex.get_balance(new att.Address(this.address));
        }
        throw new Error("Contract not initialised");
    }
    async deploy(params: Partial<ex.Parameters>) {
        const address = (await ex.deploy("./contracts/payment_with_fees.arl", {}, params)).address;
        this.address = address;
    }
    async init(beneficiary: att.Address, params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "init", init_arg_to_mich(beneficiary), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_init_param(beneficiary: att.Address, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "init", init_arg_to_mich(beneficiary), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_fees(): Promise<att.Rational> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Rational.from_mich(storage);
        }
        throw new Error("Contract not initialised");
    }
    errors = {
        r1: att.string_to_mich("\"tezos amount must be superior to 0\"")
    };
}
export const payment_with_fees = new Payment_with_fees();
