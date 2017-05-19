<template>
	<div class="container-fluid">
		<h4>Your Shopping Cart</h4>
		<div v-if="!hasItems">
			<h6>No items in your cart.</h6>
			<p>
				<v-btn primary router to="/">
					<v-icon>chevron_left</v-icon> Continue Shopping
				</v-btn>
			</p>
		</div>
		<table id="cart" class="table table-hover table-condensed" v-if="hasItems">
			<thead>
				<tr>
					<th style="width:65%">Product</th>
					<th style="width:10%">Price</th>
					<th style="width:10%">
						<span class="hidden-sm-and-down">Quantity</span>
						<span class="hidden-md-and-up">Quan.</span>
					</th>
					<th style="width:10%">
						<span class="hidden-sm-and-down">Subtotal</span>
						<span class="hidden-md-and-up">Sub.</span>
					</th>
					<th style="width:5%"></th>
				</tr>
			</thead>

			<transition-group name="list-shopping-cart" tag="tbody">
				<app-cart-item v-for="cartItem in cartItemList" :cartItem="cartItem" :key="cartItem.id"></app-cart-item>
			</transition-group>

			<tfoot>
				<tr class="hidden-md-and-up">
					<td class="total-text" colspan="5"><strong>Total ${{ totalValue }}</strong></td>
				</tr>
				<tr>
					<td colspan="5">
						<v-row>
							<v-col xs12 md4>
								<v-btn default block @click.native="saveShoppingCartLocal">
									<v-icon>chevron_left</v-icon> Save and Continue Shopping
								</v-btn>
							</v-col>
							<v-col md4 class="hidden-sm-and-down total-text"><strong>Total ${{ totalValue }}</strong></v-col>
							<v-col xs12 md4>
								<v-btn primary block @click.native="checkout">
									Checkout <v-icon>chevron_right</v-icon>
								</v-btn>
							</v-col>
						</v-row>
					</td>
				</tr>
			</tfoot>
		</table>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';
	import CartItem from './cart/CartItem.vue';
	export default {
		computed: {
			cartItemList() {
				return this.$store.getters.cartItemList;
			},
			hasItems() {
				return !!this.cartItemList.length;
			},
			totalValue() {
				let res = 0;
				this.cartItemList.forEach((item/*, idx*/) => {
					res += item.price * item.quantity;
				});
				return res;
			},
		},
		components: {
			appCartItem: CartItem,
		},
		methods: {
			...mapActions(['saveShoppingCart', 'addMessage', 'saveToTransaction', 'clearCart']),
			checkValidCart(itemList, prodList) {
				let isValid = true;
				let message = '';

				itemList.forEach((item/*, idx*/) => {
					/*eslint eqeqeq:0*/
					for (let prodIdx = 0; prodIdx < prodList.length; prodIdx++) {
						if (prodList[prodIdx].id == item.id) {
							if (prodList[prodIdx].quantity < item.quantity) {
								message = `Only ${prodList[prodIdx].quantity} ${item.title} available in stock`;
								isValid = false;
								return;
							}
							break;
						}
					}
				});
				return {
					isValid,
					message,
				};
			},
			saveShoppingCartLocal() {
				let vm = this;
				if (this.$store.getters.isLoggedIn) {
					let { isValid, message } = this.checkValidCart(
						this.$store.getters.cartItemList,
						this.$store.getters.products,
					);

					if (isValid) {
						this.saveShoppingCart({
							cartItemList: vm.$store.getters.cartItemList,
							uid: vm.$store.getters.currentUser.uid,
						}).then(() => {
							this.addMessage({
								messageClass: 'success',
								message: 'Your shopping cart is saved successfully',
							});
							this.$router.push('/');
						});
					} else {
						this.addMessage({
							messageClass: 'danger',
							message,
						});
					}
				} else {
					this.addMessage({
						messageClass: 'warning',
						message: 'Please login to save your cart',
					});
				}
			},
			checkout() {
				let vm = this;
				if (this.$store.getters.isLoggedIn) {
					if (!this.$store.getters.cartItemList || this.$store.getters.cartItemList.length === 0) {
						this.addMessage({
							messageClass: 'warning',
							message: 'Your cart is empty!',
						});
						return;
					}
					let { isValid, message } = this.checkValidCart(
						this.$store.getters.cartItemList,
						this.$store.getters.products,
					);

					if (isValid) {
						this.saveToTransaction({
							cartItemList: vm.$store.getters.cartItemList,
							uid: vm.$store.getters.currentUser.uid,
						}).then(() => {
							this.addMessage({
								messageClass: 'success',
								message: 'Your order has been successfully processed!',
							});
							this.saveShoppingCart({
								cartItemList: [],
								uid: vm.$store.getters.currentUser.uid,
							});
							this.clearCart();
							this.$router.push('/');
						});
					} else {
						this.addMessage({
							messageClass: 'danger',
							message,
						});
					}
				} else {
					this.addMessage({
						messageClass: 'warning',
						message: 'Please login to checkout',
					});
				}
			},
		},
	};
</script>

<style scoped>
	.container-fluid {
		max-width: 1020px;
	}
	.list-shopping-cart-leave-active {
		transition: all 0.4s;
	}
	.list-shopping-cart-leave-to {
		opacity: 0;
		transform: translateX(50px);
	}

	.table.table th {
		padding: 0;
	}

	.total-text {
		text-align: right;
		line-height: 48px;
	}
</style>
