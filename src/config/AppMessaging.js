/* © 2017
 * @author Thanh
 *
 * Wrapper class to integrate Firebase Cloud Messaging with our app,
 * easing the process of sending and receiving Notification
 */
/*eslint no-use-before-define:0*/
import { messaging } from './firebaseConfig';

const TOKEN_SENT = 'tokenSent';

let fcmToken;

function requestPermission() {

	if (supportNotification()) {
		messaging.requestPermission()
			.then(() => {
				console.log('Notification permission granted.');
				getToken();
			})
			.catch((err) => {
				console.log('Unable to get permission to notify.', err);
			});
	} else {
		console.log('Notification not support on this device');
	}

}

// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(() => {
	setTokenSentToServer(false);
	getToken();
});

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a sevice worker
//   `messaging.setBackgroundMessageHandler` handler.
messaging.onMessage((payload) => {
	console.log('Message received. ', payload);
	// TODO: broadcast action here
});

/**
 * Get FCM registration token to send to server if needed
 * @return {Promise} Async get token promise
 */
function getToken() {
	console.log('Getting token...');
	return messaging.getToken()
		.then((currentToken) => {
			if (currentToken) {
				fcmToken = currentToken;
				// console.log(fcmToken);

				// TODO: update state notification enabled
				// AppActions.updateNotificationPermission(true);
				sendTokenToServer(currentToken);
				// updateUIForPushEnabled(currentToken);
			} else {
				fcmToken = '';

				// AppActions.updateNotificationPermission(false);
				// Show permission request.
				console.log('No Instance ID token available. Request permission to generate one.');
				// Show permission UI.
				// updateUIForPushPermissionRequired();
				setTokenSentToServer(false);
			}
		})
		.catch((err) => {
			console.log('An error occurred while retrieving token. ', err);
			setTokenSentToServer(false);
		});
}

// Send the Instance ID token your application server, so that it can:
// - send messages back to this app
// - subscribe/unsubscribe the token from topics
function sendTokenToServer(currentToken) {
	// console.log('Current token:', currentToken);
	if (!isTokenSent()) {
		console.log('Sending token to server...');

		doSendToken(currentToken)
		.then(() => {
			console.log('Sending FCM token success');
			setTokenSentToServer(currentToken);																	// fcmToken ?
		})
		.catch(error => {
			console.log('Sending FCM token errors', error);
			setTokenSentToServer(false);
			return error;
		});
	} else {
		console.log('Token already sent to server so won\'t send it again unless it changes');
	}
}

// Send token to server and associate it with current user ID in database
function doSendToken(token) {
	console.log('Sending token:', token);

	return new Promise(resolve => {
		setTimeout(() => {
			console.log('Mock sending token success');
			resolve(token);
		});
	});
	// return fetch(`${config.FCMTOKEN_ENDPOINT}/${token}`, {
	// 	method: 'GET',
	// 	headers: {
	// 		'content-type': 'application/json',
	// 		userid: localStorage.getItem('id'),
	// 		authorization: `JWT ${localStorage.getItem('token')}`,
	// 	},
	// })
	// .then(response => response.json());
}

function isTokenSent() {
	const storedToken = localStorage.getItem(TOKEN_SENT);
	if (storedToken && storedToken === fcmToken) {
		return true;
	}
	return false;
}

function setTokenSentToServer(token) {
	if (token) {
		localStorage.setItem(TOKEN_SENT, token);
	} else {
		localStorage.setItem(TOKEN_SENT, '');
	}
}

function supportNotification() {
	return ('Notification' in window);
}

function removeFcmToken() {
	return fetch(`${config.FCMTOKEN_REMOVE_ENDPOINT}/${localStorage.getItem(TOKEN_SENT)}`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			userid: localStorage.getItem('id'),
			authorization: `JWT ${localStorage.getItem('token')}`,
		},
	})
	.then(response => response.json());
}

if (!supportNotification()) {
	console.log('Notification not support on this device');
}

export default {
	supportNotification,
	requestPermission,
	messaging,
	isTokenSent,
	removeFcmToken,
	getToken() {
		return fcmToken;
	},
};
