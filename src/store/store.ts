import { reactive } from "vue";

export const store = reactive({
	isDisplay: true,

	hideShowMenu() {
		this.isDisplay ? (this.isDisplay = false) : (this.isDisplay = true);
	},
	isItemsDisplay: false,
	itemsDisplayToggle() {
		console.log("test111");
		this.isItemsDisplay
			? (this.isItemsDisplay = false)
			: (this.isItemsDisplay = true);
	},
});
