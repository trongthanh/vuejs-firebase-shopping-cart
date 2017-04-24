import Vue from 'vue';
import VueRouter from 'vue-router';
// FIXME: use whole UI lib lib for now
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import { routes } from './routes';
import store from './stores/store';
import { firebaseListener } from './config/firebaseConfig';

import App from './App.vue';

Vue.use(VueRouter);
Vue.use(Vuetify);

firebaseListener((loggedIn, user) => {
	if (store) {
		store.commit('AUTH_STATUS_CHANGE');
		if (user) {
			store.dispatch('getShoppingCart', { uid: user.uid, currentCart: store.getters.cartItemList });
		}
	}
});

const router = new VueRouter({
	mode: 'history',
	routes,
});

// router.beforeEach((to, from, next) => {
//     if (to.onlyGuest && store.getters.isLoggedIn) {
//         next('/');
//     } else {
//         next();
//     }
// });

export default new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App),
});

