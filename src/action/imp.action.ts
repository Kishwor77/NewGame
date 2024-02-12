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

export const unlockImp = async (id: string) => {
	try {
		const result = await axios.patch(`settings/update-imp/${id}`);
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


export const useImp = async (id: string) => {
	try {
		const result = await axios.patch(`settings/use-imp/${id}`);
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