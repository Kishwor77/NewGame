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
						<div class=" flex w-full justify-center flex-wrap  text-white border-4 border-red-400">
						<div class="album-img"
							v-for="imp in imps"
							:key="imp.id"
						>
                        <div v-if="!imp.isUnlocked?.includes(id)" class="lock"> 
                            <div class="flex flex-col justify-center h-full items-center">
                                
                                   
                                    <div>
                                     {{ imp.starRequired }} {{ '  ' }}<font-awesome-icon icon="fa-solid fa-star" beat style="color: #efd634;" />
                                    </div>
                                
                                   <div>
                                     <button class="unlock-btn">
                                        Unlock
                                     </button>
                                   </div>
                                
                            </div>
                        </div> 
							<img class="image" :alt='imp.name' :src="`http://localhost:5001/imp/${imp.image}`" />
							{{imp.name}}
						</div>
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
                    image: '',
                    isUnlocked: '',
                    starRequired: ''
				}
            ],
            id: ''
		};
	},
	methods: {
		async impList() {
			const imp = await impList();
			console.log("imp data",imp.data?.data);
			this.imps = imp.data?.data;
            this.id = this.user?.id;
            console.log(this.id)
		},
	},
	mounted() {
        this.impList();
        console.log(this.user);
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
.lock{
    width: 15rem;
    height: 10rem;
    background-color: grey;
    position: absolute;
    opacity: 0.95;
}
.album-img{
    padding:2rem;
}
.image{
    width: 15rem;
    height: 10rem;
}
.unlock-btn{
    background-color: goldenrod;
    padding: 0.5rem 1rem 0.5rem 1rem;
    border-radius: 1rem;
}

</style>
