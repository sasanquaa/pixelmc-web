import isArray from "lodash/isArray";
import isObject from "lodash/isObject";
import isString from "lodash/isString";
import isNumber from "lodash/isNumber";

export const RegExps = {
	numberic: new RegExp("(?=.*[0-9])"),
	uppercase: new RegExp("(?=.*[A-Z])"),
	lowercase: new RegExp("(?=.*[a-z])")
};

export function hexToRGB(hex: String, opacity?: Number = 0) {
	const newHex = hex
		.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`)
		.substring(1)
		.match(/.{2}/g)
		.map((x) => parseInt(x, 16));
	return `rgba(${newHex[0]}, ${newHex[1]}, ${newHex[2]}, ${opacity})`;
}

export function RGBToHex(r, g, b) {
	return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
}

export function compactObject(oldObject, newObject) {
	const input = {};
	Object.entries(newObject).map((key, value) => {
		if (oldObject[key]) {
			if (value && value !== oldObject[key]) {
				input[key] = newObject[key];
			}
		} else input[key] = newObject[key];
		return `${key}: ${value}`;
	});
	return Object.keys(input).length > 0 ? input : null;
}

export function addParamsInURL(url: URL, payload?: Object, parentKey?: String) {
	if (!isObject(payload)) return url;
	Object.keys(payload).map((key) => {
		const value = payload[key];
		// Array
		if (isArray(value)) {
			value.map((v) => {
				if (isObject(v) && !isArray(v)) {
					url = addParamsInURL(url, v, `${parentKey ? `${parentKey}.` : ""}${key}`);
				} else url.searchParams.append(`${parentKey ? `${parentKey}.` : ""}${key}`, v);
				return v;
			});
		}
		// Object
		if (isObject(value) && !isArray(value)) {
			url = addParamsInURL(url, value, `${parentKey ? `${parentKey}.` : ""}${key}`);
		}
		// Number or String
		if (isString(value) || isNumber(value)) {
			url.searchParams.append(`${parentKey ? `${parentKey}.` : ""}${key}`, value);
		}
		return key;
	});
	return url;
}

export async function handleFetchResponse(response, callback) {
	const { status } = response;
	if (200 <= status <= 206) {
		if (typeof callback === "function") callback();
		const data = await response.json();
		return data.message ? data : { code: status, data, success: true, message: null };
	}
	if (400 <= status <= 505) {
		if (typeof callback === "function") callback();
		return { data: null, code: status, success: false, message: response.statusText };
	}

	return { code: null, data: null, success: false, message: "Đã xảy ra lỗi. Hãy thử lại sau." };
}
