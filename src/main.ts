import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import "./axios";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";

import { faUserSecret, faStar } from '@fortawesome/free-solid-svg-icons'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* add icons to the library */
library.add(faUserSecret,faStar)

/* add font awesome icon component */

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .use(Toast)
    .mount("#app");

// const createNewApp = () => {
// 	const app = createApp({
// 		render: () => App,
// 	});
// 	// library.add(fas, fab);
// 	console.log({ router });
// 	app.component("font-awesome-icon", FontAwesomeIcon);
// 	app.provide("eventHub", vueEmitter);
// 	app.use(router);
// 	console.log("abc");

// 	app.use(createPinia());
// 	app.mount("#app");
// 	app.config.performance = true;
// };

// const initApp = async () => {
// 	createNewApp();
// };

// initApp().then(() => {
// 	// initialized
// });
