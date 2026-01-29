'use client';

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { BellOff, BellRing, Loader2 } from "lucide-react";

interface NotificationToggleProps {
    userEmail: string
}

export default function NotificationToggle({ userEmail }: NotificationToggleProps) {
    const [enabled, setEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [pulse, setPulse] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        if (userEmail) {
            checkStatus();
        }
    }, [userEmail]);

    const checkStatus = async () => {
        if (!('serviceWorker' in navigator)) return;

        try {
            const response = await fetch('/api/notifications/status');
            if (response.ok) {
                const data = await response.json();
                setEnabled(data.enabled);
            } else if (response.status === 401) {
                console.warn('User not authenticated for notifications');
                setEnabled(false);
            }
        } catch (error) {
            console.error('Error checking notification status:', error);
        }
    };

    const handleToggle = async () => {
        if (isLoading || !userEmail) return;

        setIsLoading(true);

        try {
            if (!enabled) {
                const permission = await Notification.requestPermission();
                if (permission !== 'granted') {
                    alert('Разрешение на уведомления отклонено');
                    setIsLoading(false);
                    return;
                }

                if (!('serviceWorker' in navigator)) {
                    throw new Error('Service Worker не поддерживается');
                }

                const registration = await navigator.serviceWorker.ready;
                const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

                if (!vapidKey) {
                    throw new Error('VAPID ключ не настроен');
                }

                const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(vapidKey)
                });

                const res = await fetch('/api/notifications/subscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ subscription })
                });

                if (!res.ok) {
                    const error = await res.json();
                    throw new Error(error.details || 'Failed to save subscription');
                }

                setEnabled(true);
                setPulse(true);
                setTimeout(() => setPulse(false), 1000);

            } else {
                const registration = await navigator.serviceWorker.ready;
                const subscription = await registration.pushManager.getSubscription();

                if (subscription) {
                    const unsubscribed = await subscription.unsubscribe();
                    if (!unsubscribed) {
                        console.warn('Failed to unsubscribe from browser');
                    }

                    const res = await fetch('/api/notifications/unsubscribe', {
                        method: 'DELETE'
                    });

                    if (!res.ok) {
                        const error = await res.json();
                        throw new Error(error.details || 'Failed to delete subscription');
                    }
                }

                setEnabled(false);
            }

        } catch (error) {
            console.error('Error toggling notifications:', error);
            alert('Ошибка при изменении настроек: ' +
                (error instanceof Error ? error.message : 'Неизвестная ошибка'));
        } finally {
            setIsLoading(false);
        }
    };

    const urlBase64ToUint8Array = (base64String: string) => {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    };

    if (!userEmail) {
        return (
            <button
                disabled
                className="p-2.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
            >
                <BellOff className="h-5 w-5" />
            </button>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={handleToggle}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                disabled={isLoading}
                className={cn(
                    "relative p-2.5 rounded-full transition-all duration-300",
                    "hover:scale-105 active:scale-95",
                    "focus:outline-none focus:ring-2 focus:ring-primary/30",
                    enabled
                        ? "bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50"
                        : "bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
            >
                {pulse && (
                    <div className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-30" />
                )}

                {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                ) : enabled ? (
                    <BellRing className="h-5 w-5" />
                ) : (
                    <BellOff className="h-5 w-5" />
                )}

                {enabled && !isLoading && (
                    <div className="absolute -top-0.5 -right-0.5">
                        <div className="relative flex h-3 w-3">
                            <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                            <div className="relative inline-flex rounded-full h-3 w-3 bg-orange-500" />
                        </div>
                    </div>
                )}
            </button>

            {showTooltip && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap shadow-lg z-50">
                    <div className="relative">
                        {enabled ? 'Отключить уведомления' : 'Включить уведомления'}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
                    </div>
                </div>
            )}
        </div>
    );
}