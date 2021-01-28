import { ChargeAction } from "./reducer";
import Repository from "./repository";
import { notification } from "antd";

function notifyError(message, duration = 10) {
	notification.error({ message, duration });
}

function notifySuccess(message, duration = 10) {
	notification.success({ message, duration });
}

function notifyInfo(message, duration = 10) {
	notification.info({ message, duration });
}

function capitalize(str) {
	return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

export function getTransactions(payload) {
	return async (dispatch) => {
		dispatch(ChargeAction.getTransactionsRequest());
		const { data, message, statusCode } = await Repository.getTransactions(payload);
		if (statusCode || message) {
			dispatch(ChargeAction.getTransactionsFailure({ message }));
			notifyError(message);
			return;
		}
		dispatch(ChargeAction.getTransactionsSuccess({ data }));
	};
}

export function getTransactionTops(payload) {
	return async (dispatch) => {
		dispatch(ChargeAction.getTransactionTopsRequest());
		const { data, message, statusCode } = await Repository.getTransactionTops(payload);
		if (statusCode || message) {
			dispatch(ChargeAction.getTransactionTopsFailure({ message }));
			notifyError(message);
			return;
		}
		dispatch(ChargeAction.getTransactionTopsSuccess({ data }));
	};
}

export function chargeSubmit(payload) {
	return async (dispatch) => {
		dispatch(ChargeAction.chargeSubmitRequest());
		const { data, message, statusCode } = await Repository.chargeSubmit(payload);
		if (statusCode || message || data.status != "00") {
			dispatch(ChargeAction.chargeSubmitError({ message }));
			notifyError(message || capitalize(data.msg));
			return;
		}
		notifySuccess(data.msg);
		notifyInfo(`
            Nếu nạp thành công, bạn hãy vào game và gõ lệnh /warp shopxu để mua đồ bằng tiền xu nhá và nhớ làm trống túi đồ
            đồ, nếu không đồ nhận được từ kit hoặc crate sẽ bị mất.
        `);
		console.log(data);
		dispatch(ChargeAction.chargeSubmitSuccess());
	};
}
