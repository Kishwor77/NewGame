<template>
	<div class="grid-container">
		<NavBar class="item1" :user="user"> </NavBar>

		<main
		class =''
			:style="{
				backgroundImage: 'url(' + image + ')',
				backgroundSize: 'cover',
			}"
		>
			<div class="container m-auto flex flex-start h-full">
				
				<div class="flex w-full flex-col ">
					<div class="flex justify-end pr-10 text-amber-500 text-2xl mt-2 items-center">
						{{ coin }}{{ ' ' }} <font-awesome-icon icon="fa-solid fa-star"  style="color: #efd634;" />
					</div>
						<div class=" flex w-full justify-center flex-wrap  text-white ">
						<div class="album-img"
							v-for="imp in imps"
							:key="imp.id"
						>
                        <div v-if="!imp.isUnlocked?.includes(id)" class="lock"> 
                            <div class="flex flex-col justify-center h-full items-center ">
                                
								<div
									class="h-10 shadow flex justify-center items-center text-red-800 bg-transparent"
									v-if="errorMsg !== '' && clickId == imp.id"
								>
								{{ errorMsg }}
								</div>
								<div>
									{{ imp.starRequired }} {{ '  ' }}<font-awesome-icon icon="fa-solid fa-star" beat style="color: #efd634;" />
								</div>
							
								<div>
									<button class="unlock-btn" @click="unlockImp(imp.id)">
									Unlock
									</button>
								</div>
                                
                            </div>
                        </div> 
						<div v-if="imp.isUnlocked?.includes(id) && usedImp !== imp.image" class="use"> 
                            <div class="flex flex-col justify-center h-full items-center ">
								<div>
									<button class="use-btn" @click="useImp(imp.id)" >
									Select
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
import { impList, unlockImp, useImp } from "@/action/imp.action";
import{ userGame } from  "@/action/user";

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
			id: '',
			errorMsg: '',
			clickId: '',
			usedImp: '',
			coin: ''
		};
	},
	methods: {
		async impList() {
			const imp = await impList();
			this.imps = imp.data?.data;
            this.id = this.user?.id;
            console.log(this.id)
		},
		async unlockImp(id: string) {
			this.clickId = id;
			const result = await unlockImp(id);

			if (result.data == undefined) {
				this.errorMsg = result;
			} else if (result.data.statusCode === 200) {
				window.location.reload();
			}
		},
		async useImp(id: string) {
			this.clickId = id;
			const result = await useImp(id);

			if (result.data == undefined) {
				this.errorMsg = result;
			} else if (result.data.statusCode === 200) {
				window.location.reload();
			}
		},
		async userGame() {
			const result = await userGame();
			console.log("result", { result });
			this.usedImp = result.data?.data?.impUse;
			this.coin = result.data?.data?.coin;

			
		}
	},
	mounted() {
		this.impList();
		this.userGame();
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
.use{
    width: 15rem;
    height: 10rem;
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
.use-btn{
	background-color: green;
    padding: 0.5rem 1rem 0.5rem 1rem;
    border-radius: 1rem;
}

</style>
