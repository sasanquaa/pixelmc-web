import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	chargeSubmit: {
		loading: false,
        error: null,
		success: false
	},

	getTransactions: {
		loading: false,
		error: null,
		data: []
	}
};

const chargeSlice = createSlice({
	name: "charge",
	initialState,
	reducers: {
		resetChargeState: () => initialState,

		getTransactionsRequest: ({ getTransactions }) => {
			getTransactions.loading = true;
		},

		getTransactionsSuccess: ({ getTransactions }, { payload }) => {
			getTransactions.loading = false;
			getTransactions.data = payload.data;
		},

		getTransactionsFailure: ({ getTransactions }, { payload }) => {
			getTransactions.loading = false;
			getTransactions.error = payload.message;
		},

		chargeSubmitRequest: ({ chargeSubmit }) => {
			chargeSubmit.loading = true;
		},

		chargeSubmitSuccess: ({ chargeSubmit }, { payload }) => {
			chargeSubmit.loading = false;
            chargeSubmit.success = true;
		},

		chargeSubmitError: ({ chargeSubmit }, { payload }) => {
			chargeSubmit.loading = false;
			chargeSubmit.error = payload.message;
		}
	}
});

const ChargeAction = chargeSlice.actions;
const ChargeReducer = chargeSlice.reducer;

export { ChargeAction, ChargeReducer as default };
