'use client'

import { usePathname } from "next/navigation"

export default function SectionHeader() {
    const pathname = usePathname()
    const sectionHeaders = [{ name: "Материалы", href: "/dashboard/materials" }, { name: "Главная", href: "/dashboard" }]
    const currentHeader = sectionHeaders.find(h => h.href === pathname)

    return (
        <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{currentHeader?.name}</h1>
        </div>
    )
}