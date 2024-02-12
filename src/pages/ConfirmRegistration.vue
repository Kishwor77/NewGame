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
						Confirm Registration
					</h2>
				</div>

				<div class="mt-10 min-w-full">
					<div
						class="h-10 shadow flex justify-center items-center text-red-500"
						v-if="errorMsg !== ''"
					>
						{{ errorMsg }}
					</div>
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
import { activateAccount } from "@/action/auth";
export default defineComponent({
	/* eslint-disable */
	name: "ConfirmRegistration",

	components: {
		NavBar,
		Footer,
	},
	data() {
		return {
			token: "",
			errorMsg: "",
			successMsg: "",
		};
	},
	methods: {
		async confirmRegistration() {
			console.log(this.token);

			const result: any = await activateAccount(this.token);
			console.log("result", result);

			if (result.data == undefined) {
				this.errorMsg = ` ${result} Contact the support to activated your account`;
			} else if (result.data.statusCode === 200) {
				this.successMsg = "Email is send Successfully";
				window.history.pushState(null, '/login')
				//this.$router.push("/login");
			}
		},
	},
	created: function () {
		var currentUrl = window.location.toString();
		const rule = currentUrl.split("token");
		console.log(`Current URL => ${currentUrl.split("=")[1]}`);
		this.token = currentUrl.split("=")[1];
	},
	mounted() {
		this.confirmRegistration();
	},
});
</script>
