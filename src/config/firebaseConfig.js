import firebase from 'firebase';

const config = {
	apiKey: 'AIzaSyCy7L6RCmxM-8WLo-eD-Pq78fLOLvLuCvU',
	authDomain: 'pwa-shop.firebaseapp.com',
	databaseURL: 'https://pwa-shop.firebaseio.com',
	projectId: 'pwa-shop',
	storageBucket: 'pwa-shop.appspot.com',
	messagingSenderId: '739282454167',
};

firebase.initializeApp(config);

export function firebaseListener(func) {
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			console.log('User log in success', user);
			func(true, user);
		} else {
			console.log('User log in failed', user);
			func(false);
		}
	}, (error) => {
		console.log(error);
	});
}

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
