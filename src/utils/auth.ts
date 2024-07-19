import { BehaviorSubject } from "rxjs";

const abc = localStorage.getItem("currentUser");

let currentUserSubject: any;
if (abc != null) {
	currentUserSubject = new BehaviorSubject(
		JSON.parse(localStorage.getItem("currentUser") || ""),
	);
}

export default currentUserSubject;
// export const authenticationService = {
// 	currentUser: currentUserSubject.asObservable(),

// 	get currentUserValue() {
// 		return currentUserSubject.value;
// 	},
// };


