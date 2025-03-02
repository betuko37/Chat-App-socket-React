/* eslint-disable no-undef */
self.addEventListener('push', function(event) {
    let options = {
        body: event.data ? event.data.text() : 'Notificación por defecto',
        icon: '/charlando.png',
        badge: '/charlando.png'
    };

    event.waitUntil(
        self.registration.showNotification('Nueva Notificación', options)
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();

    // Puedes abrir una URL cuando el usuario haga clic en la notificación
    event.waitUntil(
        clients.openWindow('http://localhost:4000/')
    );
});
