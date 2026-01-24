'use client'

import { useEffect, useState, useCallback } from 'react'
import { X, Download, Smartphone, Monitor, Shield, Zap, Globe } from 'lucide-react'

export function PWAInstall() {
    const [isVisible, setIsVisible] = useState(false)
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
    const [isIOS, setIsIOS] = useState(false)
    const [isStandalone, setIsStandalone] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [showIOSInstructions, setShowIOSInstructions] = useState(false)

    const checkConditions = useCallback(() => {
        // 1. Уже установлено?
        const standalone = window.matchMedia('(display-mode: standalone)').matches
        setIsStandalone(standalone)
        if (standalone) return false

        // 2. Пользователь уже отказался?
        if (localStorage.getItem('pwa_install_dismissed') === 'true') return false

        // 3. iOS? Показываем особую инструкцию
        const userAgent = navigator.userAgent.toLowerCase()
        const ios = /iphone|ipad|ipod/.test(userAgent)
        setIsIOS(ios)

        const mobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
        setIsMobile(mobile)

        // 4. Пользователь был на сайте хотя бы n времени?
        const sessionTime = sessionStorage.getItem('session_start')
        if (sessionTime) {
            const timeOnSite = Date.now() - parseInt(sessionTime)
            if (timeOnSite < 5000) return false
        }

        return true
    }, [])

    useEffect(() => {
        // Записываем время начала сессии
        if (!sessionStorage.getItem('session_start')) {
            sessionStorage.setItem('session_start', Date.now().toString())
        }

        // Проверяем условия
        const shouldShow = checkConditions()
        if (!shouldShow) return

        // Обработчик события установки
        const handleBeforeInstall = (e: Event) => {
            e.preventDefault()
            setDeferredPrompt(e)

            // Показываем с задержкой
            const timer = setTimeout(() => {
                setIsVisible(true)
            }, 5000) // 5 секунд

            return () => clearTimeout(timer)
        }

        // Для iOS показываем свою инструкцию
        if (isIOS) {
            const timer = setTimeout(() => {
                setShowIOSInstructions(true)
            }, 8000) // 8 секунд для iOS

            return () => clearTimeout(timer)
        }

        window.addEventListener('beforeinstallprompt', handleBeforeInstall)

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
        }
    }, [checkConditions, isIOS])

    const handleInstall = async () => {
        if (!deferredPrompt && !isIOS) {
            // Fallback для Android/Desktop
            if (isMobile) {
                setShowIOSInstructions(true)
            }
            return
        }

        if (deferredPrompt) {
            deferredPrompt.prompt()
            const { outcome } = await deferredPrompt.userChoice

            if (outcome === 'accepted') {
                console.log('PWA установлено!')
                setIsVisible(false)
                localStorage.setItem('pwa_install_dismissed', 'true')
            }
        }
    }

    const handleClose = () => {
        setIsVisible(false)
        setShowIOSInstructions(false)
        localStorage.setItem('pwa_install_dismissed', 'true')
    }

    // Инструкция для iOS
    if (showIOSInstructions && !isStandalone) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-xl flex items-center gap-2">
                            <Smartphone className="text-blue-600" />
                            Установка на iOS
                        </h3>
                        <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="bg-blue-100 p-2 rounded-lg">
                                <Globe className="text-blue-600" size={20} />
                            </div>
                            <div>
                                <p className="font-semibold">1. Нажмите «Поделиться»</p>
                                <p className="text-sm text-gray-600">В нижней панели Safari</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="bg-purple-100 p-2 rounded-lg">
                                <Download className="text-purple-600" size={20} />
                            </div>
                            <div>
                                <p className="font-semibold">2. Выберите «На экран "Домой"»</p>
                                <p className="text-sm text-gray-600">Прокрутите список действий</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="bg-green-100 p-2 rounded-lg">
                                <Zap className="text-green-600" size={20} />
                            </div>
                            <div>
                                <p className="font-semibold">3. Готово!</p>
                                <p className="text-sm text-gray-600">Запускайте с домашнего экрана</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                        <button
                            onClick={handleClose}
                            className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50"
                        >
                            Понятно
                        </button>
                        <button
                            onClick={() => {
                                setShowIOSInstructions(false)
                                localStorage.setItem('pwa_install_dismissed', 'true')
                            }}
                            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
                        >
                            Больше не показывать
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    if (!isVisible || isStandalone) return null

    return (
        <div className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-2xl p-6 z-50 max-w-sm border border-white/20 animate-fade-in-up">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                        {isMobile ? <Smartphone size={22} /> : <Monitor size={22} />}
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Установить приложение</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <Shield size={12} className="opacity-80" />
                            <span className="text-xs opacity-80">Безопасно • Бесплатно</span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleClose}
                    className="bg-white/10 hover:bg-white/20 p-1.5 rounded-lg transition"
                >
                    <X size={18} />
                </button>
            </div>

            <p className="text-sm mb-4 opacity-90">
                {isMobile
                    ? 'Запускайте с домашнего экрана, работайте оффлайн'
                    : 'Отдельное окно без вкладок, уведомления, быстрый доступ'}
            </p>

            <div className="space-y-3 mb-5">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm">Работает без интернета</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-sm">В 2 раза быстрее</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-sm">Меньше занимает памяти</span>
                </div>
            </div>

            <button
                onClick={handleInstall}
                className="w-full bg-white text-blue-600 font-bold py-3 px-4 rounded-xl hover:bg-gray-50 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-lg"
            >
                <Download size={20} />
                Установить сейчас
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {isMobile ? 'БЕСПЛАТНО' : '~2 МБ'}
                </span>
            </button>

            <button
                onClick={handleClose}
                className="w-full text-center text-sm opacity-80 hover:opacity-100 mt-3 py-2"
            >
                Не сейчас
            </button>
        </div>
    )
}