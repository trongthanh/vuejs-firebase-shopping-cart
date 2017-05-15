<template>
	<v-card>
		<router-link :to="'/product/' + item.id" tag="a">
			<v-card-row class="blue-grey darken-1" :img="item.thumbnail_url" height="300px">
				<v-card-title>
					<span class="white--text  ">{{ item.title }}</span>
				</v-card-title>
			</v-card-row>
		</router-link>
		<v-card-text>
			<div v-html="shortDescription" class="clamp-lines"></div>
		</v-card-text>
		<v-card-row actions class="teal darken-1 mt-0">
			<span class="white--text">{{ item.quantity }} left in stock</span>
			<v-spacer></v-spacer>
			<v-btn icon
				:disabled="item.quantity === 0"
				@click.native="addItem">
				<v-icon class="white--text">add_shopping_cart</v-icon>
			</v-btn>
		</v-card-row>
	</v-card>
</template>

<script>
	import { mapActions } from 'vuex';
	export default {
		props: ['item', 'displayList'],
		methods: {
			...mapActions(['updateCart']),
			addItem() {
				const order = {
					item: Object.assign({}, this.item),
					quantity: 1,
					isAdd: true,
				};
				console.log(order);
				this.updateCart(order);
			},
		},
		computed: {
			shortDescription() {
				// strip HTML tags first
				let desc = this.item.description.replace(/<(?:.|\n)*?>/gm, ' ');
				if (desc && desc.length > 100) {
					return `${desc.substring(0, 100)}...`;
				}
				return desc;
			},
		},
	};
</script>

<style scoped>
	.card__row {
		position: relative;
	}
	.card__title {
		position: absolute;
		bottom: 0;
		width: 100%;
		font-weight: bold;
		background: -webkit-linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,0.8) 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.8) 100%);
	}

	.clamp-lines {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}


</style>
