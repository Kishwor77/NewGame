<template>
	<div class="flex flex-col justify-between min-h-screen">
		<NavBar> </NavBar>

		<main>bibash</main>
		<Footer></Footer>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import NavBar from "../components/NavBar.vue";

import Footer from "../components/footer.vue";

export default defineComponent({
	name: "MainPage",
	components: {
		NavBar,

		Footer,
	},
});
</script>

<style></style>
