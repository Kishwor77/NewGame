import { createRouter, createWebHistory, Router } from "vue-router";
import routes from "./router";

const router: Router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	const currentUser =
		JSON.parse(localStorage?.getItem("currentUser") || "{}") || null;

	// Admin login redirect
	if (currentUser?.role && to.path == "/login") {
		if (currentUser?.role == "admin") {
			return next({ path: "/admin" });
		} else {
			return next({ name: "HomePage" });
		}
	}
	// Admin route protection
	else if (to.meta.role == "admin") {
		if (currentUser?.role != "admin") {
			return next({ path: "/login" });
		}
	}
	// Auth route protection
	else if (to.matched.some((record) => record.meta.auth)) {
		if (!currentUser) {
			return next({ path: "/login" });
		} else if (currentUser?.role != "admin") {
			return next({ path: "/" });
		}
	}

	next();
});

export default router;
