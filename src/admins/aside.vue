<template>
	<div class="flex flex-col shadow h-screen">
		<div class="p-10"><H1>Hearing test</H1></div>
		<div>
			<ul class="list-none" v-for="(item, index) in menuList" :key="index">
				<li
					:class="`${
						page == item?.title
							? 'bg-gray-300 p-2 ml-6 hover:bg-gray-300'
							: 'p-2 ml-6 hover:bg-gray-300'
					}`"
				>
					<a :href="item.path" class="flex">
						<div>
							<component
								:is="item.meta.icon"
								:class="` w-5 mx-auto`"
								aria-hidden="true"
							/>
						</div>
						<div>{{ item?.name }}</div>
					</a>
				</li>
			</ul>
		</div>
		<div class="flex-col">
			<div class="p-2 ml-4 cursor-pointer hover:bg-gray-300" @click="hideShow">
				Settings
			</div>
			<div v-if="isOpen">
				<ul class="list-none" v-for="(item, index) in sidebar" :key="index">
					<li
						:class="`${
							page == item?.meta.title
								? 'bg-gray-300 p-2 ml-6 hover:bg-gray-300'
								: 'p-2 ml-6 hover:bg-gray-300'
						}`"
					>
						<a :href="item.path" class="flex">
							<div>
								<component
									:is="item.meta.icon"
									:class="` w-5 mx-auto`"
									aria-hidden="true"
								/>
							</div>
							<div>{{ item?.name }}</div>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import routers from "../router/router";
import { defineComponent } from "vue";
import { store } from "../store/store";
export default defineComponent({
	name: "AsideBar",
	data() {
		return {
			menu: [] as any,
			sidebar: [] as any,
			menuList: [] as any,
			isOpen: false,

			page: "",
		};
	},
	methods: {
		hideShow() {
			console.log("test");
			store.itemsDisplayToggle();
			this.isOpen = store.isItemsDisplay;
		},
	},
	mounted() {
		this.menu = routers;

		this.menu.filter((a: any) => {
			if (a.name == "Dashboard") {
				this.sidebar = a.children;
			}
		});

		this.menu.filter((a: any) => {
			if (a.meta) {
				this.menuList.push(a);
			}
		});
		if (window.location.pathname.split("/")[1] == "settings") {
			this.isOpen = true;
		}
		this.page = window.location.pathname.split("/")[2];
		if (this.page == undefined) {
			this.page = window.location.pathname.split("/")[1];
		}
	},
});
</script>
