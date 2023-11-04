<template>
	<router-view :user="user" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { getUser } from "./action/auth";
import currentUserSubject from "./utils/auth";

export default defineComponent({
	name: "App",
	data() {
		return {
			user: null,
		};
	},
	methods: {
		async getUser() {
			let result: any;
			if (localStorage.getItem("token")) {
				result = await getUser();
			}

			console.log("result", result);

			if (result?.data) {
				if (result.data.statusCode == 200) {
					this.user = result.data.data;
				}
			}
		},
	},
	mounted() {
		this.getUser();
	},
});
</script>

<style>
body {
	margin: 0;
	padding: 0;
}
</style>
