import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

import Search from "@/app/ui/materials/search/search"
import DesktopFilters from "@/app/ui/materials/filters/desktop/filters"
import MobileFilters from "@/app/ui/materials/filters/mobile/filters"

interface Metadata {
    total: number
    page: number
    limit: number
    totalPages: number
}

interface MaterialsNavProps {
    metadata: Metadata | null
    selectedCategories: string[]
    searchQuery: string
    toggleCategory: (categoryId: string) => void
    setSearchQuery: (query: string) => void
    resetFilters: () => void
}

export function MaterialsNav({ metadata, selectedCategories, searchQuery, toggleCategory, setSearchQuery, resetFilters }: MaterialsNavProps) {
    return (
        <div className="space-y-6 mb-8">
            <Search />

            <DesktopFilters selectedCategories={selectedCategories} toggleCategory={toggleCategory} resetFilters={resetFilters} />

            <MobileFilters />

            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div>
                    Найдено{' '}<span className="font-semibold text-foreground">{metadata?.total || 0}</span>{' '}материала
                </div>
            </div>
        </div>
    )
}