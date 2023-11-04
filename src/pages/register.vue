<template>
	<div class="flex flex-col min-h-screen justify-between">
		<NavBar></NavBar>
		<main class="flex justify-center -mt-80">
			<div
				class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 lg:w-1/4"
			>
				<div class="sm:mx-auto sm:w-full sm:max-w-sm">
					<img
						class="mx-auto h-10 w-auto"
						src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
						alt="Your Company"
					/>
					<h2
						class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
					>
						Create an Account
					</h2>
				</div>

				<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<div
						class="h-10 shadow flex justify-center items-center text-red-500"
						v-if="errorMsg !== ''"
					>
						{{ errorMsg }}
					</div>
					<form class="space-y-6 w-full" @submit.prevent="signupHandaler">
						<div>
							<label
								for="text"
								class="block text-sm font-medium leading-6 text-gray-900"
								>Full Name</label
							>
							<div class="mt-2">
								<input
									id="name"
									v-model="name"
									name="name"
									type="text"
									autocomplete="email"
									required
									class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div>
							<label
								for="email"
								class="block text-sm font-medium leading-6 text-gray-900"
								>Email address</label
							>
							<div class="mt-2">
								<input
									id="email"
									v-model="email"
									name="email"
									type="email"
									autocomplete="email"
									required
									class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<div class="flex items-center justify-between">
								<label
									for="password"
									class="block text-sm font-medium leading-6 text-gray-900"
									>Password</label
								>
							</div>
							<div class="mt-2">
								<input
									id="password"
									v-model="password"
									name="password"
									type="password"
									autocomplete="current-password"
									required
									class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<button
								class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Sign in
							</button>
						</div>
					</form>

					<p class="mt-10 text-center text-sm text-gray-500">
						Already have an account?
						<a
							href="/login"
							class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
							>Sign In</a
						>
					</p>
				</div>
			</div>
		</main>
		<Footer></Footer>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import NavBar from "../components/NavBar.vue";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Footer from "../components/footer.vue";

import { signup } from "@/action/auth";
export default defineComponent({
	name: "SignUp",
	components: {
		NavBar,
		Footer,
	},
	data() {
		return {
			name: "",
			email: "",
			password: "",
			errorMsg: "",
		};
	},
	methods: {
		async signupHandaler() {
			const reuslt: any = await signup(this.name, this.email, this.password);
			if (reuslt?.response?.data.statusCode == 400) {
				console.log("bibash");
				this.errorMsg = reuslt?.response?.data.message;
			} else if (reuslt?.response?.data.statusCode == 500) {
				this.errorMsg = reuslt?.response?.data.message;
			}
			if (reuslt?.response?.data.statusCode == 200) {
				this.$router.push("/login");
			}
		},
	},
});
</script>
