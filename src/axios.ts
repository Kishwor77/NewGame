import axios from "axios";

axios.defaults.baseURL = "http://localhost:5001";

axios.defaults.headers.common["Authorization"] =
	"Bearer " + localStorage.getItem("token");

axios.defaults.headers.common["Content-Type"] = "application/json";
