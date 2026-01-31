'use client'

import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function PWAInstall() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
    const [showManualButton, setShowManualButton] = useState(false)
    const [isIOS, setIsIOS] = useState(false)
    const [isStandalone, setIsStandalone] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [isInAppBrowser, setIsInAppBrowser] = useState(false)

    useEffect(() => {
        const checkStandalone = (): boolean => {
            if (window.matchMedia('(display-mode: standalone)').matches) {
                return true
            }

            const nav = navigator as any
            if (nav.standalone === true) {
                return true
            }

            return false
        }

        const standalone = checkStandalone()
        setIsStandalone(standalone)

        if (standalone) {
            console.log('Приложение уже установлено')
            return
        }

        const ua = navigator.userAgent.toLowerCase()
        const ios = /iphone|ipad|ipod/.test(ua)
        const mobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua)
        const inAppBrowser = /telegram|whatsapp|facebook|twitter|instagram/i.test(ua)

        setIsInAppBrowser(inAppBrowser)
        setIsIOS(ios)
        setIsMobile(mobile)

        const handleBeforeInstall = (e: Event) => {
            e.preventDefault()
            setDeferredPrompt(e)
            setShowManualButton(true)
        }

        if (ios) {
            setShowManualButton(true)
        }

        window.addEventListener('beforeinstallprompt', handleBeforeInstall)

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
        }
    }, [])

    const handleInstall = async () => {
        if (isIOS) {
            alert('На iOS:\n1. Нажмите "Поделиться" (квадрат со стрелкой)\n2. Выберите "На экран «Домой»"\n3. Нажмите "Добавить"')
            return
        }

        if (deferredPrompt) {
            deferredPrompt.prompt()
            const { outcome } = await deferredPrompt.userChoice

            if (outcome === 'accepted') {
                console.log('PWA установлено!')
                setShowManualButton(false)
            }
        } else {
            if (isMobile) {
                alert('На Android:\n1. Откройте меню браузера (три точки)\n2. Выберите "Установить приложение"\n3. Подтвердите установку')
            } else {
                alert('На компьютере:\n1. Нажмите на иконку 📋 в адресной строке\n2. Выберите "Установить"\n3. Подтвердите установку')
            }
        }
    }

    if (isStandalone) return null

    return (
        <>
            {isInAppBrowser && !isStandalone && (
                <div className="fixed bottom-4 left-4 right-4 bg-primary/20 text-gray-800 p-3 rounded-lg shadow-lg z-50">
                    <p className="text-center text-sm">
                        💡 Для установки приложения откройте эту страницу в браузере
                        <button
                            onClick={() => window.open(window.location.href, '_blank')}
                            className="ml-2 underline font-semibold"
                        >
                            Открыть в браузере
                        </button>
                    </p>
                </div>
            )}
            {showManualButton && !isInAppBrowser && (
                <Button
                    onClick={handleInstall}
                    variant="outline"
                    className="static md:fixed bottom-0 md: bottom-24 right-0 md:right-4 border border-primary border-3 text-primary hover:text-white hover:bg-primary p-6 rounded-xl shadow-lg z-40 transition flex items-center gap-2 animate-bounce"
                    title="Установить приложение"
                >
                    <Download size={20} />
                    <span>Установить "Поколение"</span>
                </Button>
            )}
        </>
    )
}