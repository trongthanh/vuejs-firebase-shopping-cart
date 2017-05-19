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
				&copy; 2017 Vue Shop. Checkout repository at <a href="https://github.com/trongthanh/vuejs-firebase-shopping-cart" target="_blank">Github</a>
			</div>
		</v-footer>
		<v-dialog v-model="locationRequest">
			<v-card>
				<v-card-row>
					<v-card-title>Your Location</v-card-title>
				</v-card-row>
				<v-card-row>
					<v-card-text>{{ locationText }}</v-card-text>
				</v-card-row>
				<v-card-row actions>
					<v-btn class="green--text darken-1" flat="flat" @click.native="requestLocation">OK</v-btn>
				</v-card-row>
			</v-card>
		</v-dialog>
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
				locationRequest: false,
				locationApproved: false,
				locationText: 'Please allows VueShop access your device location so that we can prioritize listing items available in ware-house nearest to you.',
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
			requestLocation() {
				console.log('Request Location');
				// close the modal
				this.locationRequest = false;

				if (!this.locationApproved && navigator.geolocation) {
					// Try HTML5 geolocation.
					navigator.geolocation.getCurrentPosition((position) => {
						let pos = {
							lat: position.coords.latitude,
							lng: position.coords.longitude,
						};
						let dist = '';
						let city = '';
						let country = '';
						// TODO: get city name
						// "latlng":"10.786513099999999,106.69388459999999"
						fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyA5axVkCHivJZaBTe8nhnIgLbRfnp5rMo0&latlng=${pos.lat},${pos.lng}`)
							.then(result => result.json())
							.then(json => {
								// console.log('pos', JSON.stringify(json));
								const addresses = json.results && json.results[0] && json.results[0].address_components;

								if (addresses) {
									addresses.forEach(address => {
										if (address.types.includes('administrative_area_level_2')) {
											dist = address.long_name;
										}
										if (address.types.includes('administrative_area_level_1')) {
											city = address.long_name;
										}
										if (address.types.includes('country')) {
											country = address.long_name;
										}
									});
									console.log(`You at located at ${dist}, ${city}, ${country}`);
									this.locationText = `You at located at ${dist}, ${city}, ${country}`;
									this.locationApproved = true;
									this.locationRequest = true;
									localStorage.setItem('location', true);
								}
							});

						console.log('pos', JSON.stringify(pos));
					}, () => {
						console.log('Get location errors');
					});
				} else {
					// Browser doesn't support Geolocation
					console.log('Browser doesn\'t support geolocation API');
				}
			},
		},
		created() {
			let uid = this.$store.getters.currentUser.uid;
			this.listenToProductList();
			this.getShoppingCart({ uid, currentCart: this.$store.getters.cartItemList });

			// FIXME: lousy localStorage access, need enhance with Vuex
			/*global localStorage*/
			if (!localStorage.getItem('location')) {
				console.log('Location not request before');
				this.locationRequest = true;
			} else {
				this.requestLocation();
			}
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
