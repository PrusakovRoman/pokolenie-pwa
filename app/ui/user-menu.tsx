'use client'

import Image from "next/image"
import Link from "next/link"

import { useState, useRef, useEffect, useTransition } from "react"
import { User, Mail, LogOut, X, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { logout } from "@/app/lib/actions"
import NotificationToggleWrapper from "@/app/ui/notifications/toggle-wrapper"

interface UserMenuProps {
    user: {
        name?: string | null
        email?: string | null
        role?: string | null
        image?: string | null
        mentor?: string
        createdAt?: string
    }
}

export function UserProfileDropdown({ user }: UserMenuProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isPending, startTransition] = useTransition()

    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        function handleEscapeKey(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        document.addEventListener("keydown", handleEscapeKey)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("keydown", handleEscapeKey)
        }
    }, [])

    useEffect(() => {
        if (isOpen) {
            if (window.innerWidth < 768) {
                document.body.style.overflow = 'hidden'
                document.body.style.touchAction = 'none'
            }
        } else {
            document.body.style.overflow = 'unset'
            document.body.style.touchAction = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
            document.body.style.touchAction = 'unset'
        }
    }, [isOpen])

    const handleLogout = () => {
        setIsOpen(false)

        startTransition(() => {
            logout()
        })
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-700 hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Открыть профиль"
                aria-expanded={isOpen}
            >
                <Image src={user?.image ? user.image : "/profile/no-photo.jpg"} alt="Фото профиля" className="object-cover" sizes="(width: 100%) (height: 100%)" fill={true} />
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-900"></div>
            </button>

            <div
                className={`fixed ${isOpen ? "inset-0" : "right-0 mt-2"}
     md:absolute md:right-0 md:mt-2 md:inset-auto md:top-auto md:left-auto md:bottom-auto
     w-full md:w-96
          bg-white dark:bg-gray-900 
          rounded-none md:rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 
          shadow-xl z-50
          transition-all duration-200 ease-out
          ${isOpen
                        ? "opacity-100 translate-y-0 visible"
                        : "opacity-0 -translate-y-2 invisible pointer-events-none"
                    }
        `}
                style={{
                    display: isOpen ? 'block' : 'none',
                }}
                aria-hidden={!isOpen}
            // inert
            >
                <div className="p-1">
                    <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Профиль</h3>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(false)}
                            className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                            aria-label="Закрыть профиль"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="p-5">
                        <div className="flex items-center justify-between gap-4 mb-6">
                            <div className="flex gap-4 items-center">
                                <div className="relative">
                                    <div className="h-16 w-16 rounded-full overflow-hidden border-3 border-primary/20">
                                        <Image src={user?.image ? user.image : "/profile/no-photo.jpg"} alt="Фото профиля" className="object-cover" width={150} height={150} />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                                        <User className="h-3 w-3 text-white" />
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{user.name}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.role}</p>
                                </div>
                            </div>
                            <NotificationToggleWrapper />
                        </div>

                        <div className="mb-6 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-gray-500" />
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {user.role === 'Участник' && (<div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <Award className="h-4 w-4 text-primary" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Наставник
                                </span>
                            </div>

                            <Link href="/mentor" className="group">
                                <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary transition-all duration-300">
                                    <div className="h-10 w-10 rounded-full overflow-hidden bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                                        <Image src="/no-photo.jpg" alt="Фото наставника" className="object-cover" width={100} height={100} />

                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white group-hover:text-primary group-hover:underline decoration-1 underline-offset-3 [text-decoration-skip-ink:none] transition-all duration-300 ">{user?.mentor}</p>
                                    </div>
                                </div>
                            </Link>

                        </div>)}

                        <Separator className="mb-6" />

                        <Button
                            variant="outline"
                            className="w-full gap-2 border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-700"
                            onClick={handleLogout}
                            disabled={isPending}
                        >
                            <LogOut className="h-4 w-4" />
                            {isPending ? "Выходим..." : "Выйти из профиля"}
                        </Button>
                    </div>
                    {user.role === 'Участник' && (<div className="px-5 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                            Вступил в проект: {user.createdAt}
                        </p>
                    </div>)}
                </div>
            </div>
        </div >
    )
}