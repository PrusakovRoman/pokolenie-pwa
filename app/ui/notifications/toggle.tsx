'use client';

import { useState } from "react";
import { cn } from "@/lib/utils";
import { BellOff, BellRing } from "lucide-react";

export default function NotificationToggle() {
    const [enabled, setEnabled] = useState(false);
    const [alertShown, setAlertShown] = useState(false);

    const handleToggle = () => {
        if (!alertShown) {
            alert('Функция уведомлений появится в следующем обновлении!');
            setAlertShown(true);
        }

        setEnabled(!enabled);
    };

    return (
        <div className="relative">
            <button
                onClick={handleToggle}
                className={cn(
                    "relative p-2.5 rounded-full transition-all duration-300",
                    "hover:scale-105 active:scale-95",
                    "focus:outline-none focus:ring-2 focus:ring-primary/30",
                    enabled
                        ? "bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50"
                        : "bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600"
                )}
            >
                {enabled ? (
                    <BellRing className="h-5 w-5" />
                ) : (
                    <BellOff className="h-5 w-5" />
                )}

                {enabled && (
                    <div className="absolute -top-0.5 -right-0.5">
                        <div className="relative flex h-3 w-3">
                            <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                            <div className="relative inline-flex rounded-full h-3 w-3 bg-orange-500" />
                        </div>
                    </div>
                )}
            </button>
        </div>
    );
}