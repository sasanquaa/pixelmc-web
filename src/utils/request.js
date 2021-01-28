import { REQUEST_TIMEOUT, TOKEN } from "../constants";
import { addParamsInURL, handleFetchResponse } from "./helpers";

type IProps = {
	path: String,
	method: String,
	payload: Object,
	isNoCors: Boolean,
	isFormData: Boolean,
	anotherUrl: String
};

async function Fetch(props: IProps) {
	const { path, method, payload, isNoCors, isFormData, anotherUrl } = props;
	try {
		let url = new URL(anotherUrl || path);
		const token = sessionStorage.getItem(TOKEN);
		const abort = new AbortController();
		const signal = abort.signal;
		const timeOutId = setTimeout(() => abort.abort(), REQUEST_TIMEOUT);
		const options = {
			method,
			signal,
			headers: {
				"Content-Type": "application/json"
			}
		};

		if (isFormData) delete options["headers"]["Content-Type"];

		if (token) options.headers["Authorization"] = token;
		if (isNoCors) options.mode = "no-cors";
		if (method === "GET" || method === "DELETE") url = addParamsInURL(url, payload);
		if (method === "PUT" || method === "POST" || method === "PATCH")
			options.body = isFormData ? payload : JSON.stringify(payload);
        
		const result = await fetch(url, options);
		return await handleFetchResponse(result, () => clearTimeout(timeOutId));
	} catch (error) {
		const result = {
			code: null,
			data: null,
			success: false,
			message: error.message
		};
		return result;
	}
}

const Request = {
	GET: (req) => Fetch({ method: "GET", ...req }),
	PUT: (req) => Fetch({ method: "PUT", ...req }),
	POST:   (req) => Fetch({ method: "POST", ...req }),
	PATCH: (req) => Fetch({ method: "PATCH", ...req }),
	DELETE: (req) => Fetch({ method: "DELETE", ...req })
};

export default Request;
