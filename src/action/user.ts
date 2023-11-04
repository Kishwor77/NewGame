import axios from "axios";

export const userList = async () => {
	try {
		const result = await axios.get("user/all");
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

export const getUserDetails = async (id: number) => {
	try {
		console.log({ id });
		const result = await axios.get(`user/details/${id}`);
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

export const updateUserConfig = async (
	id: number,
	frequency: number,
	soundLevel: number,
	speed: number,
	earSide: string,
) => {
	try {
		const result = await axios.put(`game/admin/update/${id}`, {
			frequency,
			soundLevel,
			speed,
			earSide,
		});
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
