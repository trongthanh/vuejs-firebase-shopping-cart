<template>
	<v-container fluid>
		<v-row>
			<v-col xs12 sm6 offset-sm3 lg4 offset-lg4>
				<v-card>
					<v-card-title>
						<h4 class="text-center">Login</h4>
					</v-card-title>
					<v-card-text>
						<v-text-field
							v-model="email"
							name="email"
							label="Email"
							type="email"
						></v-text-field>
						<v-text-field
							v-model="password"
							name="password"
							label="Password"
							type="password"
						></v-text-field>
						<v-btn block primary light @click.native.prevent="loginWithEmailLocal" :loading="loading">Log in</v-btn>
						<v-btn block flat light router to="/register" >Register</v-btn>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import { mapActions } from 'vuex';
	export default {
		data() {
			return {
				email: '',
				password: '',
				loading: false,
			};
		},
		methods: {
			...mapActions(['addMessage', 'clearMessage']),
			loginWithEmailLocal() {
				this.loading = true;
				let data = {
					email: this.email,
					password: this.password,
				};
				console.log('data', data);
				// this.loginWithEmail(data);
				this.$store.dispatch('loginWithEmail', data).then((/*user*/) => {
					//TODO: store user login session
					// console.log(user);
					this.clearMessage();
					this.loading = false;
					this.$router.push({ name: 'mainpage' });
				}).catch((error) => {
					console.log('Login error', error);

					let messageObj = {
						message: error.message,
						messageClass: 'danger',
						autoClose: true,
					};
					this.addMessage(messageObj);
				});
			},
		},
	};
</script>
