// public/custom-sw.js
// Этот файл импортирует сгенерированный next-pwa SW и добавляет твой код

// Импортируем сгенерированный workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

// Предзагрузка ресурсов из manifest
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

// ========== ТВОЙ КОД ДЛЯ PUSH УВЕДОМЛЕНИЙ ==========

// Обработка push-событий
self.addEventListener('push', function (event) {
    console.log('[Service Worker] Push получен');

    let data = {};
    if (event.data) {
        try {
            data = event.data.json();
        } catch (e) {
            data = {
                title: 'Новое уведомление',
                body: event.data.text() || 'У вас новое сообщение'
            };
        }
    }

    const title = data.title || 'PWA App';
    const options = {
        body: data.body || 'Новое уведомление',
        icon: data.icon || '/icons/android/android-launchericon-192-192.png',
        badge: '/icons/android/android-launchericon-72-72.png',
        tag: data.tag || 'general',
        data: data.data || {},
        actions: data.actions || [
            {
                action: 'open',
                title: 'Открыть'
            },
            {
                action: 'close',
                title: 'Закрыть'
            }
        ],
        vibrate: [200, 100, 200]
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// Клик по уведомлению
self.addEventListener('notificationclick', function (event) {
    console.log('[Service Worker] Notification click:', event.notification.tag);
    event.notification.close();

    if (event.action === 'open' || event.action === 'view') {
        const url = event.notification.data?.url || '/';
        event.waitUntil(
            clients.openWindow(url)
        );
    } else if (event.action === 'close') {
        // Просто закрываем
    } else {
        // Клик по самому уведомлению
        if (event.notification.data?.url) {
            event.waitUntil(
                clients.openWindow(event.notification.data.url)
            );
        }
    }
});

// Сообщаем о готовности
self.addEventListener('activate', event => {
    console.log('[Service Worker] Активирован');
});