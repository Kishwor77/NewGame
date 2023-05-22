<template>
	<canvas></canvas>
</template>

<script lang="ts">
import { MainScene } from "@/game/Main";
import { defineComponent } from "vue";

export default defineComponent({
	name: "HelloWorld",
	mounted() {
		const canvas = document.querySelector("canvas")!;

		new MainScene(canvas);
	},
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
canvas {
	height: 100vh;
	width: 100vw;
}
</style>
