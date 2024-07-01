import axios from "axios";

export const userList = async () => {
	try {
		const result = await axios.get("user/all");
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

export const userGame = async () => {
	try {
		const result = await axios.get('game/user', {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
		});
		return result;
	} catch (error: any) {
		return error.response
			? error.response.data.message
			: error.message
			? error.message
			: error;
	}
};


export const soundTesting = async (id:number) => {
	try {
		const result = await axios.get(`/sound-test/admin/lists/${id}`, {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
		});
		return result;
	} catch (error: any) {
		return error.response
			? error.response.data.message
			: error.message
			? error.message
			: error;
	}
}
