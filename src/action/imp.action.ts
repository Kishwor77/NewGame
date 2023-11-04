import axios from "axios";

export const impList = async () => {
	try {
		const result = await axios.get("settings/list-imp");
		console.log(result);
		return result;
	} catch (error: any) {
		return error.response
			? error.response.data.message
			: error.message
			? error.message
			: error;
	}
};
