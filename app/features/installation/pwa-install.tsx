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

    // Проверка всех условий
    useEffect(() => {
        // 1. Проверяем, установлено ли уже приложение
        const checkStandalone = (): boolean => {
            // Современный способ
            if (window.matchMedia('(display-mode: standalone)').matches) {
                return true
            }

            // Для iOS Safari (типизируем как any для TypeScript)
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

        // 2. Определяем устройство
        const ua = navigator.userAgent.toLowerCase()
        const ios = /iphone|ipad|ipod/.test(ua)
        const mobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua)

        setIsIOS(ios)
        setIsMobile(mobile)

        // 3. Проверяем, не отказывался ли пользователь
        const bannerDismissed = localStorage.getItem('pwa_banner_dismissed')
        const manualBtnHidden = localStorage.getItem('pwa_button_hidden')

        // 4. Событие установки (для Android/Chrome)
        const handleBeforeInstall = (e: Event) => {
            e.preventDefault()
            setDeferredPrompt(e)

            // Всегда показываем кнопку, если не скрыта
            if (!manualBtnHidden) {
                setShowManualButton(true)
            }
        }

        // 5. Для iOS показываем кнопку всегда (нет beforeinstallprompt)
        if (ios && !manualBtnHidden) {
            setShowManualButton(true)
        }

        window.addEventListener('beforeinstallprompt', handleBeforeInstall)

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
        }
    }, [])

    // Установка приложения
    const handleInstall = async () => {
        // iOS - инструкция
        if (isIOS) {
            alert('На iOS:\n1. Нажмите "Поделиться" (квадрат со стрелкой)\n2. Выберите "На экран «Домой»"\n3. Нажмите "Добавить"')
            return
        }

        // Android/Desktop - стандартная установка
        if (deferredPrompt) {
            deferredPrompt.prompt()
            const { outcome } = await deferredPrompt.userChoice

            if (outcome === 'accepted') {
                console.log('PWA установлено!')
                setShowManualButton(false)
            }
        } else {
            // Fallback - инструкция
            if (isMobile) {
                alert('На Android:\n1. Откройте меню браузера (три точки)\n2. Выберите "Установить приложение"\n3. Подтвердите установку')
            } else {
                alert('На компьютере:\n1. Нажмите на иконку 📋 в адресной строке\n2. Выберите "Установить"\n3. Подтвердите установку')
            }
        }
    }

    // Скрыть кнопку
    const hideButton = () => {
        setShowManualButton(false)
        localStorage.setItem('pwa_button_hidden', 'true')
    }

    // Если приложение установлено - ничего не показываем
    if (isStandalone) return null

    return (
        <>
            {showManualButton && (
                <Button
                    onClick={handleInstall}
                    variant="outline"
                    className="static md:fixed bottom-0 md: bottom-24 right-0 md:right-4 border border-primary border-3 text-primary hover:text-white hover:bg-primary p-6 rounded-xl shadow-lg z-40 transition flex items-center gap-2 animate-bounce"
                    title="Установить приложение"
                >
                    <Download size={20} className="mb-[1px]" />
                    <span className="mb-[1px]">Установить "Поколение"</span>
                </Button>
            )}
        </>
    )
}