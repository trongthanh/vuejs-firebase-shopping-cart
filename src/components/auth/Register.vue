<template>
	<v-container fluid>
		<v-row>
			<v-col xs12 sm6 offset-sm3 lg4 offset-lg4>
				<v-card>
					<v-card-title>
						<h4 class="text-center">Register</h4>
					</v-card-title>
					<v-card-text>
						<v-text-field
							v-model="email"
							name="email"
							label="Email"
							type="email"
							:rules="[emailValid]"
						></v-text-field>
						<v-text-field
							v-model="password"
							name="password"
							label="Password"
							type="password"
						></v-text-field>
						<v-text-field
							v-model="passwordRepeat"
							name="password"
							label="Repeat Password"
							:rules="[passwordValid]"
							type="password"
						></v-text-field>
						<v-btn block primary light @click.native.prevent="registerByEmailLocal">Register</v-btn>
						<v-btn block flat light router to="/login" >Login</v-btn>
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
				passwordRepeat: '',
			};
		},
		computed: {
			emailValid() {
				return !this.email || (/\S+@\S+\.\S+/.test(this.email)) ? true : 'Invalid email address';
			},
			passwordValid() {
				return !this.passwordRepeat || (this.password === this.passwordRepeat) ? true : 'Password not match';
			},
		},
		methods: {
			...mapActions(['clearMessage', 'addMessage']),
			registerByEmailLocal() {
				if (this.password !== this.passwordRepeat) {
					this.addMessage({
						message: 'Password repeat not match',
						messageClass: 'danger',
						autoClose: true,
					});
					return;
				}

				let data = {
					email: this.email,
					password: this.password,
				};
				this.$store.dispatch('registerByEmail', data).then((/*user*/) => {
					this.clearMessage();
					this.$router.push({ name: 'mainpage' });
				}).catch((error) => {
					// console.log('register error', error);
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
