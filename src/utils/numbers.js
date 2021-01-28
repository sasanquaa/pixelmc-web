import { Decimal } from "decimal.js";
import numeral from "numeral";
import { isNaN } from "lodash";

type formatCurrencyParams = {
	number: Number | String,
	decimals: Number,
	isShorty: Boolean,
	isWithoutComma: Boolean
};

export function formatCurrency({ number, decimals, isShorty, isWithoutComma }: formatCurrencyParams) {
	const tail = new Array(decimals).fill("0").join("");

	const num = new Decimal(Number(number));
	const numFixed = num.toFixed(decimals, Decimal.ROUND_DOWN);
	if (num === "NaN") return numFixed;

	const numFormat = numeral(Number(numFixed));

	if (isNaN(Number(numFixed)) || num.isNaN()) return numeral(0).format(`0,0.${tail}`);

	if (isShorty) return numFormat.format(`0,0.[${tail}]`);
	if (isWithoutComma) return numFormat.format(`0.${tail}`);

	return numFormat.format(`0,0.${tail}`);
}

export function formatBalance(number: Number, decimals: Number) {
	const num = new Decimal(Number(number));
	return !num.isNaN() ? Number(num.toFixed(decimals, Decimal.ROUND_DOWN)) : 0;
}
