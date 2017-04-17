import {
	firebaseAuth,
	// firebaseListener
} from '../../config/firebaseConfig';

const state = {
	isLoggedIn: firebaseAuth().currentUser != null,
	user: firebaseAuth().currentUser,
};

const mutations = {
	AUTH_STATUS_CHANGE(state) {
		state.isLoggedIn = firebaseAuth().currentUser != null;
		state.user = firebaseAuth().currentUser;
	},
};

const actions = {

};

const getters = {
	isLoggedIn: (state) => state.isLoggedIn,
	currentUser: (state) => {
		if (state && state.user) {
			return {
				email: state.user.email,
				emailVerified: state.user.emailVerified,
				uid: state.user.uid,
			};
		}
		return {};
	},
};

export default {
	state,
	mutations,
	actions,
	getters,
};
