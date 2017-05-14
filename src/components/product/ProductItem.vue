<template>
	<v-card>
		<router-link :to="'/product/' + item.id" tag="a">
			<v-card-row class="blue-grey darken-1" :img="item.thumbnail_url" height="300px">
				<v-card-title>
					<span class="white--text  ">{{ item.title }}</span>
				</v-card-title>
			</v-card-row>
		</router-link>
		<v-card-text class="">
			<div v-html="shortDescription"></div>
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



	div.thumbnail {
		height: 100%;
	}

	.favourite-icon {
		font-size: 25px;
	}

	.ratings {
		padding-right: 10px;
		padding-left: 10px;
		color: #d17581;
	}

	.grow {
		transition: all .2s ease-in-out;
	}
	.thumbnail:hover .grow {
		transform: scale(1.1);
	}

	.item.list-group-item {
		border: none;
		float: none;
		width: 100%;
		background-color: #fff;
		margin-bottom: 10px;
	}

	.thumbnail-image {
		padding: 15px;
	}
	.list-group-item .thumbnail-image {
		margin-right: 10px;
		max-height: 150px;
	}

	.item.list-group-item .thumbnail {
		margin-bottom: 0px;

	}

	.item.list-group-item img {
		float: left;
	}

	.item.list-group-item:after {
		clear: both;
	}
</style>
