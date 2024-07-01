<template>
    <div class="grid-container">
    <NavBar class="item1" :user="user"> </NavBar>

    <main>
        <div class="container m-auto flex flex-start h-full flex-col gap-8">
           <div class="flex gap-4">
            <!-- <div class="">
                General Info
            </div>
            <div>
                Game Config
            </div>
            <div>
                Settings
            </div> -->
           </div>
           <!-- <TabsView>
                <TabView name="GeneralInfo" :selected="true"> -->
                    <div class="flex gap-4">
                        <div class="flex flex-col">
                            <label class="text-[24] font-bold" >
                                Full Name
                            </label>
                            {{ user?.fullName }}
                        </div>
                        <div class="flex flex-col">
                            <label class="text-[24] font-bold" >
                            Email
                            </label>
                            {{ user?.email }}
                        </div>
                        <div class="flex flex-col">
                            <label class="text-[24] font-bold" >
                            Status
                            </label>
                            {{ user?.isActivated == false ? "Inactive" :"Active" }}
                        </div>
                    </div>
                <!-- </TabView>
                <TabView name="GameInfo" :selected="true"> -->
                    <div class="flex flex-col h-20">
                        <div class="font-bold">
                            <h2>Graph</h2>

                            <div class="h-40" v-if="childDataLoaded">
                                <BarChart  :label="labels" :left="leftData" :right="rightData"/>
                            </div>
                        </div>
                    </div>
                <!-- </TabView>
           </TabsView> -->
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
import{ soundTesting, userGame } from  "@/action/user";
import BarChart from "../admins/BarChart.vue";
export default defineComponent({
	name: "UserDetails",
	props: ["user"],
	components: {
		NavBar,
        Footer,
        BarChart,


	},
    data() {
          
        return {
            childDataLoaded: false,
            labels : [],
			leftData: [],
			rightData:[],
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

            const results = await soundTesting(parseInt(this.id));
			console.log("bibash2",results?.data?.data)
			const datas= results?.data?.data
       
			const heardLeft = datas?.filter((item:any) => item.isHeard && item.earSide === 'left');
			const heardRight = datas?.filter((item:any) => item.isHeard && item.earSide === 'right');
			console.log("bibash2", { heardLeft });
			
			this.labels = heardLeft?.map((item: any) => item.frequency) as any;
			this.leftData = heardLeft?.map((item: any) => item.soundLevel)  as any;
            this.rightData = heardRight?.map((item: any) => item.soundLevel) as any;
            this.childDataLoaded = true
		
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
}</style>