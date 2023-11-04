<template>
	<div class="flex flex-col min-h-screen justify-between">
		<NavBar> </NavBar>
		<main class="flex items-center, justify-center -mt-80">
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
						Change Password
					</h2>
				</div>

				<div class="mt-10 min-w-full">
					<div
						class="h-10 shadow flex justify-center items-center text-red-500"
						v-if="errorMsg !== ''"
					>
						{{ errorMsg }}
					</div>
					<form class="" @submit.prevent="changePassword">
						<div>
							<label
								for="password"
								class="block text-sm font-medium leading-6 text-gray-900"
								>Password</label
							>
							<div class="mt-2 mb-8">
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
							<label
								for="Confirm Password"
								class="block text-sm font-medium leading-6 text-gray-900"
								>Confirm Password</label
							>
							<div class="mt-2 mb-8">
								<input
									id="confirmPassword"
									v-model="confirmPassword"
									name="confirmPassword"
									type="password"
									required
									class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<button
								class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Send
							</button>
						</div>
					</form>
				</div>
			</div>
		</main>
		<Footer></Footer>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import NavBar from "../components/NavBar.vue";

import Footer from "../components/footer.vue";
import { forget, forgetChangePassword } from "@/action/auth";
export default defineComponent({
	/* eslint-disable */
	name: "ChangeForgetPassword",

	components: {
		NavBar,
		Footer,
	},
	data() {
		return {
			password: "",
			confirmPassword: "",
			errorMsg: "",
			successMsg: "",
			token: "",
		};
	},
	methods: {
		async changePassword() {
			console.log(this.token);
			if (this.password === this.confirmPassword) {
				const result: any = await forgetChangePassword(
					this.password,
					this.confirmPassword,
					this.token,
				);
				console.log("result", result);

				if (result.data == undefined) {
					this.errorMsg = result;
				} else if (result.data.statusCode === 200) {
					this.successMsg = "Email is send Successfully";
					this.$router.push("/login");
				}
			} else {
				this.errorMsg = "Password did not match";
			}
		},
	},
	created: function () {
		var currentUrl = window.location.toString();
		const rule = currentUrl.split("token");
		console.log(`Current URL => ${currentUrl.split("=")[1]}`);
		this.token = currentUrl.split("=")[1];
	},
	mounted() {},
});
</script>
