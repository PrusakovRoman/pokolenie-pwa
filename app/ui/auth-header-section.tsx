'use client'

import Link from "next/link"
import { Session } from 'next-auth'

import { Button } from "@/components/ui/button"
import { UserProfileDropdown } from "@/app/ui/user-menu"

interface AuthHeaderSectionProps {
    session: Session | null
}

export default function AuthSection({ session }: AuthHeaderSectionProps) {
    return (
        <>
            {session?.user ? (<UserProfileDropdown user={session.user} />) : (
                <Button asChild>
                    <Link href="/login">Войти</Link>
                </Button>)
            }
        </>
    )
}



