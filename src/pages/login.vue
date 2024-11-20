<template>
	<div class="flex flex-col ">
		<NavBar> </NavBar>
		<main class="flex items-center, justify-center">
			<div
				class="flex flex-col justify-center px-6  lg:px-8 lg:w-1/4"
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
						Sign in to your account
					</h2>
				</div>

				<div class="mt-10 min-w-full">
					<form class="" @submit.prevent="login">
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
								<div class="text-sm flex justify-end">
									<a
										href="forget"
										class="font-semibold text-indigo-600 hover:text-indigo-500"
										>Forgot password?</a
									>
								</div>
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
						Not a member?
						<a
							href="/register"
							class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
							>Create an account</a
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
import Footer from "../components/footer.vue";
import { login } from "@/action/auth";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useRouter } from 'vue-router';
export default defineComponent({
	name: "LogIn",
	components: {
		NavBar,
		Footer,
	},
	data() {
		return {
			email: "",
			password: "",
			errorMsg: "",
			userdetails: "",
		};
	},
	setup() {
		const router = useRouter();
		return { router };
	},
	methods: {
		async login() {
			const result: any = await login(this.email, this.password);
			console.log("result", result);
			if (result.data == undefined) {
				toast.error(result || 'An error occurred')
			} else if (result.data.statusCode === 200) {
				toast.success(result?.data?.msg || 'Register SuccessFull')

				localStorage.setItem("token", result?.data?.token);
				localStorage.setItem("currentUser", JSON.stringify(result?.data?.data));
				setTimeout(() => {
					this.router.push('/');
					window.location.reload();
				}, 1000);
			}
		},
	},
});
</script>
