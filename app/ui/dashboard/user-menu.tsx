// components/layout/UserMenu.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { LogOut, User, ChevronDown, Settings } from 'lucide-react'
import Link from 'next/link'

export default function UserMenu() {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    // Закрытие меню при клике вне его
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="relative" ref={menuRef}>
            {/* Кнопка-триггер */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-full p-1 hover:bg-gray-100 transition-colors"
                aria-label="Открыть меню пользователя"
            >
                <Avatar className="h-8 w-8 md:h-10 md:w-10">
                    <AvatarImage src="/avatar-placeholder.jpg" alt="Иван Иванов" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                        ИИ
                    </AvatarFallback>
                </Avatar>
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Меню */}
            {isOpen && (
                <>
                    {/* Overlay для мобилок */}
                    <div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Само меню */}
                    <div className={`
            fixed md:absolute
            bottom-0 md:bottom-auto
            left-0 md:left-auto
            right-0 md:right-0
            md:top-full
            md:mt-2
            bg-white
            rounded-t-2xl md:rounded-lg
            shadow-lg
            border
            z-50
            overflow-hidden
            animate-in slide-in-from-bottom-full md:slide-in-from-top-5
            duration-200
          `}>
                        {/* Заголовок для мобилок */}
                        <div className="p-4 border-b md:hidden">
                            <h3 className="font-semibold">Аккаунт</h3>
                        </div>

                        {/* Информация о пользователе */}
                        <div className="p-4 md:p-6 border-b">
                            <div className="flex items-center gap-3 mb-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src="/avatar-placeholder.jpg" />
                                    <AvatarFallback className="bg-primary text-primary-foreground">
                                        ИИ
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h4 className="font-semibold">Иван Иванов</h4>
                                    <p className="text-sm text-gray-500">ivan.ivanov@email.com</p>
                                </div>
                            </div>

                            <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Группа:</span>
                                    <span className="font-medium">5.1</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Наставник:</span>
                                    <span className="font-medium">Петр Петров</span>
                                </div>
                            </div>
                        </div>

                        {/* Ссылки */}
                        <div className="p-2">
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-gray-700 hover:bg-gray-100"
                                asChild
                            >
                                <Link href="/dashboard/profile" onClick={() => setIsOpen(false)}>
                                    <User className="mr-2 h-4 w-4" />
                                    Мой профиль
                                </Link>
                            </Button>

                            <Button
                                variant="ghost"
                                className="w-full justify-start text-gray-700 hover:bg-gray-100"
                                asChild
                            >
                                <Link href="/dashboard/settings" onClick={() => setIsOpen(false)}>
                                    <Settings className="mr-2 h-4 w-4" />
                                    Настройки
                                </Link>
                            </Button>
                        </div>

                        {/* Выход */}
                        <div className="p-2 border-t">
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                                asChild
                            >
                                <Link href="/logout" onClick={() => setIsOpen(false)}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Выйти из аккаунта
                                </Link>
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}