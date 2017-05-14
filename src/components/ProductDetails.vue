<template>
	<div class="container">
		<v-progress-linear v-bind:indeterminate="true" v-if="loading"></v-progress-linear>
		<v-row>
			<v-col xs12>
				<h4 class="item-title">{{ item.title }}</h4>
				<v-chip outline label class="primary primary--text price-tag">${{ item.price }}</v-chip>
			</v-col>
			<v-col md6 >
				<img class="product-image" :src="item.thumbnail_url" alt="">
			</v-col>
			<v-col md6 >
				<div class="add-to-cart">
					<v-btn
						primary light
						@click.native="addItem"
						:disabled="item.quantity === 0">
						Add to cart
					</v-btn>
					<span>{{ item.quantity }} left in stock</span>
				</div>
				<p v-html="item.description"></p>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';

	export default {
		computed: {
			item() {
				let id = this.$route.params.id;
				if (this.$store.getters.products.length >= id) {
					/*eslint eqeqeq:0*/
					let filterArr = this.$store.getters.products.filter((item) => (
						item.id == id
					));
					if (filterArr.length > 0) {
						return filterArr[0];
					}
				}
				return {};
			},
			loading() {
				return this.$store.getters.isProductLoading;
			},
		},
		methods: {
			...mapActions(['updateCart']),
			addItem() {
				const order = {
					item: Object.assign({}, this.item),
					quantity: 1,
					isAdd: true,
				};
				// console.log(order);
				this.updateCart(order);
			},
		},
	};
</script>

<style scoped>
	.product-image {
		width: 100%;
	}

	.item-title {
		display: inline-block;
		margin: 8px 0;
	}

	.price-tag {
		height: auto;
		font-size: 25px;
		float: right;
		margin-right: 0px;
	}

	.add-to-cart {
		margin: -6px 6px 6px -6px;
	}
</style>
