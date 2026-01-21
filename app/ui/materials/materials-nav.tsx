import Search from "@/app/ui/materials/search/search"
import DesktopFilters from "@/app/ui/materials/filters/desktop/filters"
import MobileFilters from "@/app/ui/materials/filters/mobile/filters"

import { Metadata } from "@/lib/types/materials"

interface MaterialsNavProps {
    metadata: Metadata | null
    allCategories: string[]
    selectedCategories: string[]
    searchQuery: string
    toggleCategory: (category: string) => void
    setSearchQuery: (query: string) => void
    resetFilters: (isAllSelected: boolean) => void
    removeFilter: (category: string) => void
}

export function MaterialsNav({ metadata, selectedCategories, allCategories, searchQuery, toggleCategory, setSearchQuery, resetFilters, removeFilter }: MaterialsNavProps) {
    return (
        <div className="space-y-6 mb-8">
            <Search />

            <DesktopFilters selectedCategories={selectedCategories} allCategories={allCategories} toggleCategory={toggleCategory} resetFilters={resetFilters} removeFilter={removeFilter} />

            <MobileFilters />

            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div>
                    Найдено{' '}<span className="font-semibold text-foreground">{metadata?.total || 0}</span>{' '}материала(ов)
                </div>
            </div>
        </div>
    )
}