import { createRouter, createWebHistory, Router } from "vue-router";
import routes from "./router";

const router: Router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	// const store = useStore();
	// store.dashboard.setIsSBOpen(false);

	console.log(to)
	const currentUser =
		JSON.parse(localStorage?.getItem("currentUser") || "{}") || null;
	console.log("000", currentUser);
	if (currentUser?.role && to.path == "/login") {
		if (currentUser?.role == "admin") {
			return next({ path: "/admin" });
		} else {
			return next({ name: "HomePage" });
		}
	} else if (to.meta.role == "admin") {
		console.log(currentUser?.role != "admin" && to.path == "/admin");
		if (currentUser?.role != "admin" && to.path == "/admin") {
			console.log("path001", to.path, currentUser?.role);
			return next({ path: "/login" });
		} else if (currentUser?.role == "admin" && to.path == "/login") {
			return next({ path: "admin" });
		}
	}
	// else if (currentUser?.role == "admin" && to.path !== "/admin") {
	// 	console.log("bibash test")
	// 	return next({ path: "/admin" });
	// }
	else {
		if (to.matched.some((record) => record.meta.auth)) {
			console.log("000", currentUser);
			if (!currentUser) {
				next({ path: "/login" });
			} else {
				console.log("bibash");
				next({ path: "/" });
			}

			next();
		}
	}
	next();
});

export default router;
