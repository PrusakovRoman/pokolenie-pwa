'use client'

import { useEffect, useState } from 'react'

export default function OfflineAlert() {
    const [isOnline, setIsOnline] = useState(true)

    useEffect(() => {
        const updateOnlineStatus = () => {
            setIsOnline(navigator.onLine)
        }

        updateOnlineStatus() // начальное состояние

        window.addEventListener('online', updateOnlineStatus)
        window.addEventListener('offline', updateOnlineStatus)

        return () => {
            window.removeEventListener('online', updateOnlineStatus)
            window.removeEventListener('offline', updateOnlineStatus)
        }
    }, [])

    if (isOnline) return null

    return (
        <div className="fixed top-0 left-0 right-0 bg-amber-500 text-white text-center py-2 px-4 z-50">
            <div className="flex items-center justify-center gap-2">
                <span>📶</span>
                <span className="font-medium">Нет подключения к интернету</span>
            </div>
        </div>
    )
}