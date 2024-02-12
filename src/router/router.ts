import HelloWorld from "@/components/HelloWorld.vue";

import Login from "@/pages/login.vue";
import Home from "@/pages/Home.vue";
import Register from "@/pages/register.vue";
import GuidePage from "@/pages/GuidePage.vue";
import AboutUs from "@/pages/AboutUs.vue";
import MainPage from "@/pages/MainPage.vue";
import ForgetPassword from "@/pages/Forget.vue";
import Game from "@/pages/Game.vue";
import Album from "@/pages/Album.vue";
import ChestPage from "@/pages/ChestPage.vue";
import ChangeForgetPassword from "@/pages/ChangeForgetPassword.vue";
import ConfirmRegistration from "@/pages/ConfirmRegistration.vue";

// for admin
import Admin from "@/admins/admin.vue";
import AdminLogin from "@/admins/login.vue";
import {
	HomeIcon,
	UserIcon,
	AdjustmentsIcon,
	DocumentTextIcon,
} from "@heroicons/vue/outline";

const routes = [
	{
		name: "HomePage",
		component: Home,
		path: "/",
	},
	{
		name: "Chest",
		component: ChestPage,
		path: "/Chest",
	},
	{
		name: "Game",
		component: HelloWorld,
		path: "/play",
	},
	{
		name: "StartGame",
		component: Game,
		path: "/game",
	},
	{
		name: "Album",
		component: Album,
		path: "/album",
	},
	{
		name: "Register",
		component: Register,
		path: "/register",
	},
	{
		name: "Activated",
		component: ConfirmRegistration,
		path: "/activated-account",
	},
	{
		name: "Login",
		component: Login,
		path: "/login",
	},
	{
		name: "Forget",
		component: ForgetPassword,
		path: "/forget",
	},
	{
		name: "ChangeForget",
		component: ChangeForgetPassword,
		path: "/forget-password",
	},
	{
		name: "AboutUs",
		component: AboutUs,
		path: "/about-us",
	},
	{
		name: "GuidePage",
		component: GuidePage,
		path: "/guide",
	},
	{
		name: "MainPage",
		component: MainPage,
		path: "/main",
	},
	{
		name: "Dashboard",
		component: Admin,
		path: "/admin",
		title: "admin",
		meta: {
			icon: HomeIcon,
		},
	},
	{
		name: "Users",
		component: Admin,
		path: "/admin/users",
		title: "users",
		meta: {
			icon: UserIcon,
		},
	},
	{
		name: "Usersdetails",
		component: Admin,
		path: "/admin/details/:id",
		title: "admin",
	},
	{
		name: "Settings",
		component: Admin,
		path: "/settings",
		title: "settings",
		meta: {
			icon: AdjustmentsIcon,
		},

		children: [
			{
				name: "Privacy&Policy",
				path: "privacy&policy",
				component: Admin,
				meta: {
					title: "privacy&policy",
					icon: DocumentTextIcon,
					color: "text-success-50",
					requiresAuth: true,
					role: "admin",
				},
			},
			{
				name: "Terms&Condition",
				component: Admin,
				path: "/settings/terms&condition",
				meta: {
					title: "terms&condition",
					icon: DocumentTextIcon,
					color: "text-success-50",
					requiresAuth: true,
					role: "admin",
				},
			},
			{
				name: "Testimonial",
				component: Admin,
				path: "/settings/testimonial",
				meta: {
					title: "testimonial",
					icon: DocumentTextIcon,
					color: "text-success-50",
					requiresAuth: true,
					role: "admin",
				},
			},
			{
				name: "SliderImage",
				component: Admin,
				path: "/settings/homeslider",
				meta: {
					title: "homeslider",
					icon: DocumentTextIcon,
					color: "text-success-50",
					requiresAuth: true,
					role: "admin",
				},
			},
		],
	},
	// {
	// 	name: "AdminPage",
	// 	component: Admin,
	// 	path: "/admin/users",
	// 	meta: {
	// 		auth: true,
	// 		role: "admin",
	// 	},
	// },
	// {
	// name: "AdminPage",
	// component: Admin,
	// path: "/admin/settings/:settingsItem?",
	// meta: {
	// 	auth: true,
	// 	role: "admin",
	// 	title: "Components",
	// 	icon: ChevronDownIcon,
	// 	color: "text-info",
	// 	requiresAuth: true,
	// 	parentPath: "Components",
	// },
	// children: [
	// 	{
	// 		name: "Privacy&Policy",
	// 		component: Admin,
	// 		path: "/admin/settings/privacy&policy",
	// 		meta: {
	// 			title: "Privacy & Policy",
	// 			icon: DocumentTextIcon,
	// 			color: "text-success-50",
	// 			requiresAuth: true,
	// 			role: "admin",
	// 		},
	// 	},
	// 	{
	// 		name: "Terms&Condition",
	// 		component: Admin,
	// 		path: "/admin/settings/terms&condition",
	// 		meta: {
	// 			title: "Terms & Condition",
	// 			icon: DocumentTextIcon,
	// 			color: "text-success-50",
	// 			requiresAuth: true,
	// 			role: "admin",
	// 		},
	// 	},
	// 	{
	// 		name: "Testimonial",
	// 		component: Admin,
	// 		path: "/admin/settings/testimonial",
	// 		meta: {
	// 			title: "Testimonial",
	// 			icon: ChatBubbleLeftRightIcon,
	// 			color: "text-success-50",
	// 			requiresAuth: true,
	// 			role: "admin",
	// 		},
	// 	},
	// 	{
	// 		name: "SliderImage",
	// 		component: Admin,
	// 		path: "/admin/settings/homeslider",
	// 		meta: {
	// 			title: "Slider Image",
	// 			icon: PhotoIcon,
	// 			color: "text-success-50",
	// 			requiresAuth: true,
	// 			role: "admin",
	// 		},
	// 	},
	// ],
	// },

	{
		name: "adminLogin",
		component: AdminLogin,
		path: "/admin/login",
	},
];

// routes.map((to: any, from: any, next: any) => {
// 	if (to.matched.some((record: any) => record.meta.requiresAuth)) {
// 		if (isAuthenticated()) {
// 			next();
// 		} else {
// 			alert("Auth required!");
// 			next("/admin/login");
// 		}
// 	}
// });

// const router = createRouter({
// 	history: createWebHistory(),
// 	routes,

// 	scrollBehavior(to, from, savedPosition) {
// 		// always scroll to top
// 		return { top: 0 };
// 	},
// });

// router.beforeEach((to: any, from: any, next: any) => {
// 	// redirect to login page if not logged in and trying to access a restricted page
// 	const authorize = to;

// 	console.log("001", to.meta.role);
// 	const role = [];

// 	role.push(to.meta.role);
// 	console.log("role", role);

// 	console.log(to);
// 	console.log("bibash", authorize);
// 	const currentUser = authenticationService.currentUserValue;
// 	console.log(currentUser);
// 	if (authorize) {
// 		if (!currentUser) {
// 			// not logged in so redirect to login page with the return url
// 			next({ path: "/" });
// 		}

// 		console.log("bibash007", role.includes(currentUser.role));
// 		//console.log("bibash001", authorize.includes(currentUser.role));
// 		// check if route is restricted by role
// 		if (!role.includes(currentUser.role)) {
// 			console.log("bibash001 test");
// 			// role not authorised so redirect to home page
// 			next("/");
// 		}
// 	}

// 	next();
// });
export default routes;
