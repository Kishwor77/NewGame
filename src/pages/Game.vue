<template>
	<div class="grid-container">
		<NavBar class="item1" :user="user"> </NavBar>

		<main
		class ='border-4 border-red-400'
			:style="{
				backgroundImage: 'url(' + image + ')',
				backgroundSize: 'cover',
			}"
		>
			<div class="container m-auto flex flex-start h-full">
				<div class="flex w-full flex-col border-4 border-stone-400">
					<a href="/album">
						<div class=" flex  w-full justify-end text-white border-4 border-red-400">
						<div class="img-items"
							v-for="imp in imps"
							:key="imp.id"
						>
							<img class="imp-image" :alt='imp.name' :src="`http://localhost:5001/imp/${imp.image}`" />
							{{imp.name}}
								
							
						</div>
					</div>
					</a>
					
					<div
						class="flex flex-col items-center h-full justify-center text-white"
					>
						<a href="/play" class="bg-green-500 p-4 rounded-xl"> Play Game</a>
					</div>
				</div>
			</div>
		</main>
		<Footer class="item2"></Footer>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import NavBar from "../components/NavBar.vue";
import Footer from "../components/footer.vue";
import { impList } from "@/action/imp.action";

export default defineComponent({
	name: "GamePage",
	props: ["user"],
	components: {
		NavBar,
		Footer,
	},
	data() {
		return {
			image: "images/background.jpg",
			imps: [
				{
					id: '',
					name: '',
					image: ''
				}
			],
		};
	},
	methods: {
		async impList() {
			const imp = await impList();
			console.log("imp data",imp.data?.data);
			this.imps = imp.data?.data;
			console.log(this.imps);
		},
	},
	mounted() {
		this.impList();
	},
});
</script>

<style>
.grid-container {
	display: grid;
	grid-template-areas:
		"header header header header header header"
		"main main main main main main"
		"footer footer footer footer  footer footer";
	gap: 10px;
}
.item1 {
	grid-area: header;
}
main {
	grid-area: main;
	min-height: 100vh;
}
.item2 {
	grid-area: footer;
}
.imp-image{
	height:4rem;
	width:4rem;
	border-radius: 50%;
	border: 1px solid black;
	z-index: -1;
}

.img-items:not(:first-child){
	margin-left: -3rem;
}

</style>
