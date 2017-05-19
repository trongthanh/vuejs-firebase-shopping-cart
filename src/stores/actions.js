import { ref, firebaseAuth } from '../config/firebaseConfig';

export const updateCart = ({ commit }, { item, quantity, isAdd }) => {
	// TODO: Call service
	commit('UPDATE_CART', { item, quantity, isAdd });
	if (isAdd) {
		let messageObj = {
			message: `Add ${item.title} to cart successfully`,
			messageClass: 'success',
			autoClose: true,
		};
		commit('ADD_MESSAGE', messageObj);
	}
};

export const removeItemInCart = ({ commit }, { item }) => {
	commit('REMOVE_CART_ITEM', { item });
};

export const registerByEmail = ({ commit }, { email, password }) => (
	firebaseAuth().createUserWithEmailAndPassword(email, password)
);

export const logout = ({ commit }) => {
	commit('SET_CART', []); // clear current cart
	return firebaseAuth().signOut();
};

export function loginWithEmail({ commit }, { email, password }) {
	return firebaseAuth().signInWithEmailAndPassword(email, password);
}

export function listenToProductList({ commit }) {
	// try restore from localStorage first, then let the database sync later
	let localProductList = null;

	// console.log('Rehydrate product lists', localStorage.getItem('products'));
	try {
		localProductList = JSON.parse(localStorage.getItem('products'));
	} catch (err) {
		console.log('Product list rehydrate failed', err);
	}

	if (localProductList) {
		console.log('rehydrating local product list');
		commit('REHYDRATE_PRODUCT_LIST', localProductList);
	}

	return ref.child('products').on('value', (products) => {
		console.log('updating product list');
		console.log(products.val());
		commit('UPDATE_PRODUCT_LIST', products.val());
	});
}

export function getShoppingCart({ commit }, { uid, currentCart }) {
	if (uid) {
		return ref.child(`cart/${uid}`).once('value').then((cart) => {
			// console.log(cart.val());
			if (cart.val() && (!currentCart || currentCart.length === 0)) {
				commit('SET_CART', cart.val());
			}
		});
	}
	console.log('User has not logged in');
	return null;
}

export function saveShoppingCart({ commit }, { uid, cartItemList }) {
	// console.log("ACTIONS saveShoppingCart");
	// console.log("CART DATA", cartItemList);
	return ref.child(`cart/${uid}`).set(cartItemList);
}

export function saveToTransaction({ commit }, { uid, cartItemList }) {
	let newTransactionKey = ref.child('transactions').push().key;
	let newTransaction = {};
	newTransaction[`/transactions/${uid}/${newTransactionKey}`] = cartItemList;
	return ref.update(newTransaction);
}
