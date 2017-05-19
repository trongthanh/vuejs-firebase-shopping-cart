/* © 2017 pwa-shop
 * @author Thanh
 */
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
/*global importScripts, firebase*/
importScripts('https://www.gstatic.com/firebasejs/4.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.0.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
	'messagingSenderId': '739282454167',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
	console.log('[firebase-messaging-sw.js] Received background message ', payload);
	const data = payload.data;
	// Customize notification here
	const notificationTitle = 'Vue Shop';
	const notificationOptions = {
		body: data.message,
		icon: 'assets/logo.png',
	};

	return self.registration.showNotification(notificationTitle, notificationOptions);
});
