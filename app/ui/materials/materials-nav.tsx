import Search from "@/app/ui/materials/search/search"
import DesktopFilters from "@/app/ui/materials/filters/desktop/filters"
import MobileFilters from "@/app/ui/materials/filters/mobile/filters"

import { CategoryStat, Metadata } from "@/lib/types/materials"
import { materialsWord } from "@/app/lib/utils"

interface MaterialsNavProps {
    metadata: Metadata | null
    selectedCategories: string[]
    categoryStats: CategoryStat[]
    searchQuery: string
    toggleCategory: (category: string) => void
    setSearchQuery: (query: string) => void
    resetFilters: (isAllSelected: boolean) => void
    removeFilter: (category: string) => void
}

export function MaterialsNav({ metadata, selectedCategories, categoryStats, searchQuery, toggleCategory, setSearchQuery, resetFilters, removeFilter }: MaterialsNavProps) {
    const count = metadata?.total || 0
    return (
        <div className="space-y-6 mb-8">
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <DesktopFilters selectedCategories={selectedCategories} categoryStats={categoryStats} toggleCategory={toggleCategory} resetFilters={resetFilters} removeFilter={removeFilter} />

            <MobileFilters />

            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div>
                    Найдено{' '}<span className="font-semibold text-foreground">{count}</span>{' '}{materialsWord(count)}
                </div>
            </div>
        </div>
    )
}