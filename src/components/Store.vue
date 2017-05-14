<template>
	<div class="container-fluid" :class="{loadingItem: loading}">
		<v-progress-linear v-if="loading" :indeterminate="true"></v-progress-linear>
		<div class="row action-panel" v-if="!loading">
			<div class="col-xs-12">
				<!--We don't support layout toggle for now
					<div class="btn-group pull-right">
					<a id="list" class="btn btn-default btn-sm" @click.prevent="changeDisplay(true)">
						<span class="glyphicon glyphicon-th-list"></span>List
					</a>
					<a id="grid" class="btn btn-default btn-sm" @click.prevent="changeDisplay(false)">
						<span class="glyphicon glyphicon-th"></span>Grid
					</a>
				</div>
				<v-btn-toggle v-bind:options="toggleButtons" v-model="icon"></v-btn-toggle>-->
			</div>
		</div>

		<v-row v-if="!loading">
			<v-col lg3 md4 sm6  v-for="(prod, idx) in products" :key="prod.id">
				<app-product-item :item="prod" :key="prod.id" :displayList="displayList"></app-product-item>
			</v-col>
		</v-row>

	</div>
</template>

<script>
	import ProductItem from './product/ProductItem.vue';

	export default {
		data() {
			return {
				icon: {},
				toggleButtons: [
					{ text: 'List', icon: 'view_list', value: 1 },
					{ text: 'Grid', icon: 'view_module', value: 2 },
				],
				loaderColor: '#5cb85c',
				loaderSize: '50px',
				displayList: false,
			};
		},
		computed: {
			products() {
				return this.$store.getters.products;
			},
			loading() {
				console.log('isLoading', this.$store.getters.isProductLoading);
				return this.$store.getters.isProductLoading;
			},
		},
		components: {
			appProductItem: ProductItem,
		},
		methods: {
			changeDisplay(isList) {
				this.displayList = isList;
			},
		},
	};
</script>

<style>
	.action-panel {
		margin-bottom: 10px;
		margin-right: 5px;
	}

	.container-fluid {
		max-width: 1360px;
		padding: 0 1rem;
	}

	.col {
		margin: 0.5rem 0;
	}
</style>
