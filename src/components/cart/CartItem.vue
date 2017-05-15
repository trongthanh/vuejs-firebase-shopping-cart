<template>
	<tr>
		<td data-th="Product">
			<div class="row">
				<div class="col xs4 md2">
					<div class="img-container">
						<img :src="cartItem.thumbnail_url" alt="..." class="cart-item-image"/>
					</div>
				</div>
				<div class="col xs8 md10">
					<h4 class="cart-item-title">{{ cartItem.title }}</h4>
					<p class="hidden-sm-and-down">{{ shortDescription }}</p>
				</div>
			</div>
		</td>
		<td data-th="Price">{{ cartItem.price }}</td>
		<td data-th="Quantity">
			<v-text-field type="number"
				class="quantity-input"
				:value="cartItem.quantity"
				@input.native="updateQuantity"
				min="0" />
		</td>
		<td data-th="Subtotal" >${{ subtotal }}</td>
		<td data-th="">
			<v-btn light default raised @click.native="removeItem" class="hidden-xs-only"><v-icon>remove_shopping_cart</v-icon></v-btn>
			<v-btn light default floating small @click.native="removeItem" class="hidden-sm-and-up"><v-icon>remove_shopping_cart</v-icon></v-btn>
		</td>
	</tr>
</template>

<script>
	import { mapActions } from 'vuex';
	export default {
		props: ['cartItem'],
		computed: {
			subtotal() {
				return this.cartItem.quantity * this.cartItem.price;
			},
			// itemQuantity: {
			// 	get() {
			// 		return
			// 	}
			// }
			shortDescription() {
				// strip HTML tags first
				let desc = this.cartItem.description.replace(/<(?:.|\n)*?>/gm, ' ');
				if (desc && desc.length > 100) {
					return `${desc.substring(0, 100)}...`;
				}
				return desc;
			},
		},
		methods: {
			...mapActions(['updateCart', 'removeItemInCart']),
			removeItem() {
				let vm = this;
				this.removeItemInCart({
					item: vm.cartItem,
				});
			},
			updateQuantity(event) {
				let vm = this;
				this.updateCart({
					item: vm.cartItem,
					quantity: parseInt(event.target.value, 10) || 0,
					isAdd: false,
				});
			},
		},
	};
</script>

<style scoped>
	.img-container {
		padding-bottom: 100%;
		overflow: hidden;
		position: relative;
	}
	.cart-item-image {
		height: 100%;
		position: absolute;
		right: 0; /*products image are right aligned*/
	}

	@supports (object-fit: cover) {
		.cart-item-image {
			width: 100%;
			object-fit: cover;
		}
	}

	.cart-item-title {
		font-size: 22px;
		line-height: 1em;
	}

	.btn {
		min-width: none;
	}

	@media screen and (max-width: 768px) {
		.cart-item-title {
			font-size: 16px;
		}

		.table.table td {
			padding: 0;
		}
		.quantity-input {
			width: 30px;
		}
	}

	@media screen and (max-width: 576px) {
		.cart-item-title {
			font-size: 14px;
		}
	}

	.quantity-input {
		max-width: 50px;
		top: 10px;
	}
</style>
