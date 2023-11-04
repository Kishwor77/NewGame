<template>
	<header class="shadow-md">
		<nav
			class="mx-auto flex max-w-7xl items-center p-6 lg:px-8"
			aria-label="Global"
		>
			<div class="flex flex-1">
				<a href="#" class="-m-1.5 p-1.5">
					<span class="sr-only">Your Company</span>
					<img
						class="h-8 w-auto"
						src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
						alt=""
					/>
				</a>
			</div>

			<div class="items-center">
				<div class="flex justify-around">
					<div class="flex-auto pr-10">
						<a href="/" class="text-sm font-semibold leading-6 text-gray-900"
							>Home</a
						>

						<!-- <div>
							{{
								currentUrl.split("/")[currentUrl.split("/").length - 1] == ""
									? "bibash"
									: ""
							}}
						</div> -->
					</div>
					<div class="flex-auto pr-10" v-if="!user">
						<a
							href="/about-us"
							class="text-sm font-semibold leading-6 text-gray-900"
							>About us</a
						>
					</div>
					<div class="flex-auto pr-10">
						<a
							href="/guide"
							class="text-sm font-semibold leading-6 text-gray-900"
							>How to play</a
						>
					</div>
					<div class="flex flex-1 justify-end" v-if="user">
				<a href="/game" class="text-sm font-semibold leading-6 text-gray-900"
					>Game </a
				>
			</div>
				</div>
			</div>
			<div class="flex flex-1 justify-end" v-if="!user">
				<a href="/login" class="text-sm font-semibold leading-6 text-gray-900"
					>Log in <span aria-hidden="true">&rarr;</span></a
				>
			</div>
			
			<div class="flex flex-1 justify-end" v-if="user">
				<div>
					<a
						href="/user/:username"
						class="text-sm font-semibold leading-6 text-gray-900"
					>
						<span class="flex justify-center items-center"
							>{{ user.fullName }} <img class="h-8 pl-1" src="/images/user.png"
						/></span>
					</a>
				</div>
			</div>
		</nav>
		<!-- Mobile menu, show/hide based on menu open state. -->
	</header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "NavBar",
	// mounted() {
	// 	const canvas = document.querySelector("canvas")!;

	// 	new MainScene(canvas);
	// },
	props: ["user"],

	data() {
		return {
			currentUrl: window.location.href,
		};
	},
});
</script>
