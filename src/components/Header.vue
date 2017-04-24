<template>
	<v-toolbar class="top-header">
		<v-toolbar-side-icon @click.native.stop="menuClicked" class="hidden-sm-and-up"/>
		<v-toolbar-title>PWA Shop</v-toolbar-title>
		<v-toolbar-items class="hidden-xs-only">
			<v-toolbar-item ripple router to="/login" v-if="!isLoggedInLocal">Login</v-toolbar-item>
			<v-toolbar-item ripple @click="logoutLocal" v-if="isLoggedInLocal">Logout {{ userEmail }}</v-toolbar-item>
			<v-toolbar-item ripple router to="/register" v-if="!isLoggedInLocal">Register</v-toolbar-item>
		</v-toolbar-items>
		<v-toolbar-items>
			<v-toolbar-item ripple router to="/cart">
				<v-icon>shopping_cart</v-icon>
				{{ numItems }} ($ {{ cartValueLocal }})
			</v-toolbar-item>
		</v-toolbar-items>
	</v-toolbar>
</template>

<script>
	import { mapActions } from 'vuex';
	export default {
		computed: {
			isLoggedInLocal() {
				return this.$store.getters.isLoggedIn;
			},
			numItems() {
				let res = 0;
				this.$store.getters.cartItemList.forEach((item/*, idx*/) => {
					res += item.quantity;
				});
				return res;
			},
			userEmail() {
				if (this.isLoggedInLocal) {
					return this.$store.getters.currentUser.email;
				}
				return '';
			},
			cartValueLocal() {
				return this.$store.getters.cartValue;
			},
		},
		methods: {
			...mapActions(['logout']),
			logoutLocal() {
				this.logout();
			},
			menuClicked() {
				this.$emit('menuClicked');
			},
		},
	};
</script>


<style scoped>
	.top-header {
		/* reduce content padding */
		padding: 0;
	}
</style>
