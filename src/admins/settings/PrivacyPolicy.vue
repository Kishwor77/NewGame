<template>
	<!-- component -->

	<div class="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] sm:w-full">
		<div class="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
			<div
				class="px-6 flex items-center justify-between space-x-4 2xl:container"
			>
				<h5 hidden class="text-2xl text-gray-600 font-medium lg:block">
					Dashboard
				</h5>
				<button class="w-12 h-16 -mr-2 border-r lg:hidden" @click="hideShow">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 my-auto"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
				<div>
					<span
						@mouseover="upHere = true"
						@mouseleave="upHere = false"
						id="dropdownbtn"
						class="relative hover:bg-blue-800 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						type="button"
						v-if="user"
					>
						{{ user?.fullName }}
					</span>

					<div
						id="dropdown"
						v-show="upHere"
						class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute"
					>
						<ul
							class="py-2 text-sm text-gray-700 dark:text-gray-200"
							@mouseover="upHere = true"
							@mouseleave="upHere = false"
						>
							<li>
								<a
									href="#"
									class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
									>Sign out</a
								>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import AdminAside from "../aside.vue";
import { defineComponent } from "vue";
export default defineComponent({
	name: "PrivacyPolicy",
	props: ["user"],
});
</script>
<style></style>
