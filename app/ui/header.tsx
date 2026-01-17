'use server'

import Link from "next/link"
import { auth } from "@/lib/auth"

import { Button } from "@/components/ui/button"

import Logo from "@/app/ui/pokolenie-logo"

export default async function Header() {
    const session = await auth()

    return (<header className="hidden md:block">
        <div className="container mx-auto p-6">
            <div className="bg-white mx-auto flex justify-between align-center px-8 py-6 rounded-4xl shadow-md">
                <div className="flex items-center gap-3">
                    <Logo />
                </div>
                <Button asChild>
                    {session?.user ? <Link href="/dashboard">Перейти в профиль</Link> : <Link href="/login">Войти</Link>}
                </Button>
            </div>
        </div>
    </header>)
}