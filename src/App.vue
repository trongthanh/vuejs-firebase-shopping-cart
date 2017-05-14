<template>
	<v-app id="app" class="app-shell" >
		<app-header v-on:menuClicked="sidebarToggled"></app-header>
		<message-component></message-component>
		<main class="main-content">
			<v-sidebar left fixed drawer v-model="sidebarOpened">
				<v-list>
					<v-list-item>
						<v-list-tile ripple router to="/">
							<v-list-tile-action>
								<v-icon>home</v-icon>
							</v-list-tile-action>
							<v-list-tile-content>
								<v-list-tile-title>Home</v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
					</v-list-item>
					<v-list-item v-if="!isLoggedInLocal">
						<v-list-tile ripple router to="/login">
							<v-list-tile-action>
								<v-icon>lock</v-icon>
							</v-list-tile-action>
							<v-list-tile-content>
								<v-list-tile-title>Login</v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
					</v-list-item>
					<v-list-item v-if="isLoggedInLocal">
						<v-list-tile ripple @click.native.prevent="logout">
							<v-list-tile-action>
								<v-icon>exit_to_app</v-icon>
							</v-list-tile-action>
							<v-list-tile-content>
								<v-list-tile-title>Logout</v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
					</v-list-item>
					<v-list-item v-if="!isLoggedInLocal">
						<v-list-tile ripple router to="/register">
							<v-list-tile-action>
								<v-icon>account_circle</v-icon>
							</v-list-tile-action>
							<v-list-tile-content>
								<v-list-tile-title>Register</v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
					</v-list-item>
					<v-list-item>
						<v-list-tile ripple>
							<v-list-tile-action>
								<v-icon>info</v-icon>
							</v-list-tile-action>
							<v-list-tile-content>
								<v-list-tile-title>About</v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
					</v-list-item>
				</v-list>
			</v-sidebar>
			<v-content>
				<router-view></router-view>
			</v-content>
		</main>
		<v-footer>
			<div class="copy">
				&copy; 2017 PWA Shop. Checkout repository at <a href="https://github.com/trongthanh/vuejs-firebase-shopping-cart" target="_blank">Github</a>
			</div>
		</v-footer>
		<div class="panel panel-warning" id="reset-store-panel">
			<div class="panel-heading">Admin Panel (Testing purpose)</div>
			<div class="panel-body text-center">
				<button class="btn btn-warning">Reset Store</button>
			</div>
		</div>
	</v-app>
</template>

<script>
	import { mapActions } from 'vuex';
	import Header from './components/Header.vue';
	import MessageComponent from './components/common/messageComponent.vue';
	export default {
		data() {
			return {
				sidebarOpened: false,
			};
		},
		computed: {
			isLoggedInLocal() {
				return this.$store.getters.isLoggedIn;
			},
		},
		components: {
			appHeader: Header,
			messageComponent: MessageComponent,
		},
		methods: {
			...mapActions(['getShoppingCart', 'listenToProductList', 'logout']),
			sidebarToggled() {
				console.log('this.sidebarOpened', this.sidebarOpened);
				this.sidebarOpened = !this.sidebarOpened;
			},
		},
		created() {
			let uid = this.$store.getters.currentUser.uid;
			this.listenToProductList();
			this.getShoppingCart({ uid, currentCart: this.$store.getters.cartItemList });
		},
	};
</script>

<style>
	html, body {
		height: 100%;
	}
	.app-shell {
		display: flex;
		flex-direction: column;
	}

	.main-content {
		/*space for the sticky toolbar*/
		padding-top: 64px;
	}

	.footer a {
		color: #ffeb3b;
	}
	.footer a:hover {
		color: #fff;
	}
	/* TODO: fix this */
	#reset-store-panel {
		display: none;
		bottom: 0px; right: 0px;
	}

	.inline-block {
		display: inline-block;
	}
</style>
