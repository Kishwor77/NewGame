<template>
	<div class="flex flex-col justify-between min-h-screen">
		<NavBar> </NavBar>
		<SliderBar></SliderBar>
		<main>bibash</main>
		<Footer></Footer>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import NavBar from "../components/NavBar.vue";
import SliderBar from "../components/SliderBar.vue";
import Footer from "../components/footer.vue";

export default defineComponent({
	name: "GuidePage",
	components: {
		NavBar,
		SliderBar,
		Footer,
	},
});
</script>

<style></style>
