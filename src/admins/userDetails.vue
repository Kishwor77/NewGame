<!-- eslint-disable @typescript-eslint/no-explicit-any -->
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
		<div class="p-2 flex flex-col min-h-[500px]">
			<div class="flex flex-col">
				<div class="font-bold text-blue-700">
					<h2>User Overview</h2>
				</div>
				<div class="flex justify-between p-4">
					<div>
						<div class="font-semibold">Full Name</div>
						<div>
							{{ userdetails.fullName }}
						</div>
					</div>
					<div>
						<div class="font-semibold">Email</div>
						<div>
							{{ userdetails.email }}
						</div>
					</div>
					<div>
						<div class="font-semibold">Role</div>
						<div>
							{{ userdetails.role }}
						</div>
					</div>
					<div>
						<div class="font-semibold">Active</div>
						<div>
							{{ userdetails.isActivated }}
						</div>
					</div>
					<div>
						<div class="font-semibold">Hear Count</div>
						<div>
							{{ userdetails?.game[0].hearCount }}
						</div>
					</div>
				</div>
			</div>
			<div class="flex flex-col">
				<div class="font-bold">
					<h2>Game Config</h2>
				</div>
				<div class="text-red-500 flex justify-center">
					<div v-for="(error, index) in errors" :key="index">{{ error }}</div>
				</div>
				<form @submit.prevent="hasChanged" novalidate>
					<div class="flex justify-between p-4">
						<div>
							<div class="font-semibold">Frequency</div>
							<div>
								<input
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									type="text"
									v-model="gameConfig.frequency"
								/>
							</div>
						</div>
						<div>
							<div class="font-semibold">Speed</div>
							<div>
								<input
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									type="text"
									v-model="gameConfig.speed"
								/>
							</div>
						</div>
						<div>
							<div class="font-semibold">Sound Level</div>
							<div>
								<input
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									type="text"
									v-model="gameConfig.soundLevel"
								/>
							</div>
						</div>
						<div>
							<div class="font-semibold">Ear Side</div>
							<div>
								<input
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									type="text"
									v-model="gameConfig.earSide"
								/>
							</div>
						</div>
						<div class="flex flex-col justify-center mt-6 text-white">
							<div
								class="bg-green-800 p-2 justify-center items-center rounded-md hover:bg-green-600"
							>
								<input type="submit" value="Save" />
							</div>
						</div>
					</div>
				</form>
			</div>
			<div class="flex flex-col">
				<div class="font-bold">
					<h2>Sound Test</h2>
				</div>
				<div class="flex justify-between p-4">
				</div>
			</div>
			<div class="flex flex-col h-20">
				<div class="font-bold">
					<h2>Graph</h2>

					<div class="h-40" v-if="childDataLoaded">
						<BarChart  :label="labels" :left="leftData" :right="rightData" />
					</div>
				</div>
			</div>
			
		</div>
		<div>
			<div class="table-container">
				<h1>User Game Records Table</h1>
				<table class="records-table">
				<thead>
					<tr>
					<!-- <th>ID</th> -->
					<th>Sound Level</th>
					<th>Frequency</th>
					<th>Ear Side</th>
					<th>Sound Heard</th>
					<!-- Add more headers as needed -->
					</tr>
				</thead>
				<tbody>
					<tr v-for="record in soundData" :key="record.id">
					<!-- <td>{{ record.id }}</td> -->
					<td>{{ record.soundLevel.toFixed(2) }}</td>
					<td>{{ record.frequency }}</td>
					<td>{{ record.earSide }}</td>
					<td>{{ isActive(record.isHeard) }}</td>
					<!-- Add more columns as needed -->
					</tr>
				</tbody>
				</table>
			</div>
		</div>
	</div>
</template>
<style>
.table-container {
  width: 80%;
  margin: 20px auto;
}

.records-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.records-table th, .records-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.records-table th {
  background-color: #f2f2f2;
  color: #333;
}

.records-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.records-table tbody tr:hover {
  background-color: #e9e9e9;
}

</style>
<script lang="ts">
import { defineComponent } from "vue";
import BarChart from "./BarChart.vue";

import { getUserDetails, soundTesting, updateUserConfig } from "@/action/user";
import { toInteger } from "lodash";
const defaultForm = {
	earSide: "",
	frequency: "",
	soundLevel: "",
	speed: "",
};
export default defineComponent({
	name: "UserList",
	props: ["user"],
	components: {
	BarChart	
	},

	setup(props) {
		console.log("user", props.user);
	},
	data() {
		return {
			childDataLoaded: false,
			labels : [],
			leftData: [],
			rightData:[],
			errors: [] as string[],
			soundData:[] as any,
			component: "",
			userdetails: {
				id:Number,
				fullName: "",
				email: "",
				role: "",
				isActivated: "",
				game: [
					{
						earSide: "",
						frequency: "",
						soundLevel: "",
						speed: "",
						hearCount: "",
					},
				],
			},
			gameConfig: {
				...defaultForm,
			},
		};
	},
	methods: {
		async getUserDetails() {
			const result = await getUserDetails(toInteger(this.component));

			this.userdetails = result?.data.data;
			this.gameConfig.frequency = this.userdetails.game[0].frequency;
			this.gameConfig.earSide = this.userdetails.game[0].earSide;
			this.gameConfig.soundLevel = this.userdetails.game[0].soundLevel;
			this.gameConfig.speed = this.userdetails.game[0].speed;

			const results = await soundTesting(parseInt(this.component));
			const datas= results?.data?.data
			this.soundData = datas;
			console.log({datas})
			const heardLeft = datas?.filter((item:any) => item.isHeard && item.earSide === 'left');
			const heardRight = datas?.filter((item:any) => item.isHeard && item.earSide === 'right');
	
			
			this.labels = heardLeft?.map((item: any) => item.frequency) as any;
			this.leftData = heardLeft?.map((item: any) => item.soundLevel)  as any;
			this.rightData = heardRight?.map((item: any) => item.soundLevel) as any;
			this.childDataLoaded = true
		},

		async hasChanged() {
			if (this.gameConfig.frequency == "") {
				this.errors.push("Frequency is empty");
			}
			if (this.gameConfig.earSide == "") {
				this.errors.push("Ear side is empty");
			}
			if (
				this.gameConfig.earSide != "left" &&
				this.gameConfig.earSide != "right"
			) {
				this.errors.push("Ear side must be left or right");
			}
			if (this.gameConfig.soundLevel == "") {
				this.errors.push("Sound level is empty");
			}
			if (this.gameConfig.speed == "") {
				this.errors.push("Speed is empty");
			}
			if (this.gameConfig.speed > "1") {
				this.errors.push("Speed should be 1 or less than 1");
			}

			if (this.errors.length == 0) {
				const result = await updateUserConfig(
					toInteger(this.component),
					parseInt(this.gameConfig.frequency),
					parseFloat(this.gameConfig.soundLevel),
					parseFloat(this.gameConfig.speed),
					this.gameConfig.earSide,
				);
			}
		},

		isActive(active:boolean) {
			return active ? 'Yes' : 'No';
      }
	},

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	mounted() {
		this.component = window.location.pathname.split("/")[3];
		this.getUserDetails();
	},
	async created() {
			const results = await soundTesting(parseInt(this.component));
			const datas= results?.data?.data
		
			const heardLeft = datas?.filter((item:any) => item.isHeard && item.earSide === 'left');
			const heardRight = datas?.filter((item:any) => item.isHeard && item.earSide === 'right');
			console.log("bibash2", { heardLeft });
			
			this.labels = heardLeft?.map((item: any) => item.frequency) as any;
			this.leftData = heardLeft?.map((item: any) => item.soundLevel)  as any;
			this.rightData = heardRight?.map((item: any) => item.soundLevel) as any;
	}
});
</script>
