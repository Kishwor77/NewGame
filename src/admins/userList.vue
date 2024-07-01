<template>
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
		<div class="container ml-auto flex flex-col">
			<div class="flex flex-wrap justify-between p-3">
				<div>
					<form>
						<label
							for="default-search"
							class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
							>Search</label
						>
						<div class="relative">
							<div
								class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
							>
								<svg
									class="w-4 h-4 text-gray-500 dark:text-gray-400"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 20 20"
								>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
									/>
								</svg>
							</div>
							<input
								type="search"
								id="default-search"
								class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Search Mockups, Logos..."
								required
							/>
						</div>
					</form>
				</div>
				<div>
					<select
						id="countries"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					>
						<option selected>Choose a Gender</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
					</select>
				</div>
			</div>

			<div class="flex flex-col">
				<div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
						<div class="overflow-hidden">
							<table class="min-w-full text-left text-sm font-light">
								<thead class="border-b font-medium dark:border-neutral-500">
									<tr>
										<th scope="col" class="px-6 py-4">SN</th>
										<th scope="col" class="px-6 py-4">Full Name</th>
										<th scope="col" class="px-6 py-4">Email</th>
										<th scope="col" class="px-6 py-4">role</th>
										<th scope="col" class="px-6 py-4">Actions</th>
									</tr>
								</thead>
								<tbody>
									<tr
										class="border-b dark:border-neutral-500"
										v-for="user in userdetails"
										:key="user.id"
									>
										<td class="whitespace-nowrap px-6 py-4 font-medium">
											{{ user.id }}
										</td>
										<td class="whitespace-nowrap px-6 py-4">
											{{ user.fullName }}
										</td>
										<td class="whitespace-nowrap px-6 py-4">
											{{ user.email }}
										</td>
										<td class="whitespace-nowrap px-6 py-4">
											{{ user.role }}
										</td>
										<td class="whitespace-nowrap px-6 py-4 flex">
											<div>
												<button
													class="bg-lime-500 p-1 pl-2 pr-2 rounded-md text-white font-bold mr-2"
												>
													<!-- <router-link :to="'details/' + user.id"
														></router-link
													> -->
													<a :href="'details/' + user.id">Details</a>
												</button>
											</div>
											<div>
												<button
													class="bg-red-600 p-1 pl-2 pr-2 rounded-md text-white font-bold"
												>
													Delete
												</button>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import AdminAside from "./aside.vue";
import { userList } from "@/action/user";
import { users } from "./interface/user.interface";
export default defineComponent({
	name: "UserList",
	props: ["user"],
	components: {},

	setup(props) {
		console.log("users", props.user);
	},
	data() {
		return {
			userdetails: [] as string[],
		};
	},
	methods: {
		async listUser() {
			const result = await userList();
			console.log("bibash", result?.data.data);
			let userdetails = [];
			this.userdetails = result?.data.data;
		},
	},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	mounted() {
		this.listUser();
	},
});
</script>
