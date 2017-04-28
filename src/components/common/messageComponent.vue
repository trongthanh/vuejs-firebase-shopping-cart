<template>
	<!-- <div :class="(showMessageBar?'':'hidden') + '  message-bar'">
		<div
			:class="messageClass">
			<Button bsStyle='link' class="btn btn-link close-btn" @click="closeMessageBar">
				<i class="fa fa-times"></i>
			</Button>

			<div>{{ message }}</div>
		</div>
	</div>-->
	<v-snackbar
		:timeout="timeout"
		:top="vertical === 'top'"
		:bottom="vertical === 'bottomm'"
		:right="horizontal === 'right'"
		:left="horizontal === 'left'"
		:class="messageClass"
		v-model="shown"
	>
		{{ message }}
		<v-btn flat dark small @click.native="clearMessage">Close</v-btn>
	</v-snackbar>

</template>

<script>
	import { mapActions } from 'vuex';
	export default {
		data() {
			return {
				vertical: 'top',
				horizontal: 'center',
				timeout: 4000,
			};
		},
		computed: {
			shown() {
				// console.log('showMessageBar', this.$store.getters.messages.message);
				return !!(this.$store.getters.messages.message &&
						this.$store.getters.messages.message.length > 0);
			},

			messageClass() {
				// console.log('messageClass', this.$store.getters.messages.messageClass);
				switch (this.$store.getters.messages.messageClass) {
					case 'danger':
						return 'red';
					default:
						return '';
				}
			},
			message() {
				// console.log('message', this.$store.getters.messages.message);
				return this.$store.getters.messages.message;
			},
		},
		methods: {
			...mapActions(['clearMessage']),
		},
	};
</script>

<style scoped>

	/*.message-bar {
			position:fixed;
			top:0;
			left:50%;
			width: 50%;
			min-height: 50px;
			z-index: 9999;
			margin-left:-25%;
	}
		.message-bar .close-btn {
			position: absolute;
			top: 0;
			right: 0;
			color: #FFF;
		}
		.message-bar .panel {
			border-color: transparent;
			border-top-left-radius: 0;
			border-top-right-radius: 0;
			padding-right: 25px;
		}
		.panel {
		padding: 10px 15px;
	}

	.panel-danger {
		background-color: #d9534f;
		color: #FFF;
	}

	.panel-success {
		background-color: #5cb85c;
		color: #FFF;
	}

	.panel-warning {
		background-color: #f0ad4e;
		color: #FFF;
	}*/
</style>
