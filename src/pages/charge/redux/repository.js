import Request from "../../../utils/request";
import {API_PATHS} from "../../../constants";

async function getTransactions(payload) {
    try {
        const response = await Request.GET({path: API_PATHS.TRANSACTION, payload: payload});
        return response;
    }catch(err) {
        return err;
    }
}

async function chargeSubmit(payload) {
    try {
        const response = await Request.POST({path: API_PATHS.CHARGE, payload: payload});
        return response;
    }catch(err) {
        return err;
    }
}

const Repository = {
    getTransactions,
    chargeSubmit
};

export default Repository;