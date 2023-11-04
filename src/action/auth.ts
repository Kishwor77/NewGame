import axios from "axios";

export const login = async (email: string, password: string) => {
	console.log(email, password);
	try {
		const result = await axios.post("auth/login", {
			email,
			password,
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

export const forget = async (email: string) => {
	try {
		const result = await axios.post("auth/forget/sendLink", {
			email,
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
export const forgetChangePassword = async (
	password: string,
	confirmPassword: string,
	token: string,
) => {
	try {
		console.log(token);
		const result = await axios.post(
			`auth/forget/changePassword?token=${token}`,
			{
				password,
				confirmPassword,
			},
		);
		return result;
	} catch (error: any) {
		return error.response
			? error.response.data.message
			: error.message
			? error.message
			: error;
	}
};

export const signup = async (name: string, email: string, password: string) => {
	try {
		const result = await axios.post("auth/register", {
			fullName: name,
			email,
			password,
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

export const activateAccount = async (token: string) => {
	try {
		const result = await axios.post(`auth/activateAccount?token=${token}`, {});

		return result;
	} catch (error: any) {
		return error.response
			? error.response.data.message
			: error.message
			? error.message
			: error;
	}
};

export const getUser = async () => {
	try {
		const result = await axios.get("user/account");
		localStorage.removeItem("currentUser");

		localStorage.setItem("currentUser", JSON.stringify(result.data.data));

		console.log("abc", result);
		return result;
	} catch (error: any) {
		return error.response
			? error.response.data.message
			: error.message
			? error.message
			: error;
	}
};
