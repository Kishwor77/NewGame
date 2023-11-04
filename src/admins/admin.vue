<template>
	<div class="flex">
		<!-- component -->
		<AdminAside
			class="lg:w-[25%] xl:w-[20%] 2xl:w-[15%]"
			v-if="display"
		></AdminAside>
		<UserList :user="user" v-if="component == 'users'"></UserList>
		<UserDetails :user="user" v-if="component == 'details'"></UserDetails>
		<Dashboard :user="user" v-if="component == undefined"></Dashboard>
		<PrivacyPolicy
			:user="user"
			v-if="component == 'privacy&policy'"
		></PrivacyPolicy>
		<TermsCondition
			:user="user"
			v-if="component == 'terms&condition'"
		></TermsCondition>

		<Testimonial :user="user" v-if="component == 'testimonial'"></Testimonial>
		<!-- //<HomeSlider :user="user" v-if="component == 'homeslider'"></HomeSlider> -->
	</div>
</template>

<script lang="ts">
import AdminAside from "./aside.vue";
import Dashboard from "./Dashboard.vue";
import PrivacyPolicy from "./settings/PrivacyPolicy.vue";
import TermsCondition from "./settings/TermsCondition.vue";
import Testimonial from "./settings/Testimonial.vue";
import UserList from "./userList.vue";
import UserDetails from "./userDetails.vue";
import { defineComponent } from "vue";
import { store } from "../store/store";
export default defineComponent({
	name: "AdminPage",
	components: {
		AdminAside,
		Dashboard,
		PrivacyPolicy,
		TermsCondition,
		Testimonial,
		UserList,
		UserDetails,
	},
	props: ["user"],
	data() {
		return {
			component: "",
			display: true,
		};
	},
	methods: {
		hideShow() {
			store.hideShowMenu;
		},
	},
	mounted() {
		console.log(this.component);
		console.log("value", window.location.pathname.split("/"));
		this.component = window.location.pathname.split("/")[2];

		console.log("component", this.component);
		this.display = store.isDisplay;
	},
});
</script>
<style></style>
