import Vue from 'vue';
import VueRouter from 'vue-router';
// import VueResource from 'vue-resource';

import { routes } from './routes';
import store from './stores/store';
import { firebaseListener } from './config/firebaseConfig';

import App from './App.vue';

Vue.use(VueRouter);

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

