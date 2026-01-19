'use client'

import Link from "next/link"
import clsx from "clsx"
import { usePathname } from "next/navigation"

import { Home, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NavLinks() {
    const pathname = usePathname()
    const links = [{ name: 'Главная', href: '/dashboard', icon: Home }, { name: 'Материалы', href: '/dashboard/materials', icon: BookOpen }]

    return (
        <>
            {links.map(link => {
                const LinkIcon = link.icon
                return (
                    <Button key={link.name} variant="outline" size="sm" className={clsx("flex items-center gap-2 hover:text-primary hover:border-primary hover:bg-white shadow-sm", { 'bg-primary/10 text-primary border-primary hover:bg-primary/10': pathname === link.href })} asChild>
                        <Link href={link.href} className="flex items-center gap-2">
                            <LinkIcon className="h-4 w-4" />
                            <span className="hidden md:block">{link.name}</span>
                        </Link>
                    </Button>
                )
            })}
        </>
    )
}