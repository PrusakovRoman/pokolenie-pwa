'use client'

import Search from "@/app/ui/materials/search/search"
import DesktopFilters from "@/app/ui/materials/filters/desktop/filters"
import MobileFilters from "@/app/ui/materials/filters/mobile/filters"

import { CategoryStat, Metadata } from "@/lib/types/materials"
import { materialsWord } from "@/app/lib/utils"
import AddMaterialButton from "@/app/ui/materials/admin/add-material-button"

interface MaterialsNavProps {
    metadata: Metadata | null
    selectedCategories: string[]
    categoryStats: CategoryStat[]
    searchQuery: string
    toggleCategory: (category: string) => void
    setSearchQuery: (query: string) => void
    resetFilters: () => void
    removeFilter: (category: string) => void
}

export function MaterialsNav({ metadata, selectedCategories, categoryStats, searchQuery, toggleCategory, setSearchQuery, resetFilters, removeFilter }: MaterialsNavProps) {
    const count = metadata?.total || 0
    return (
        <div className="space-y-6 mb-4 xs:mb-8">
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <DesktopFilters selectedCategories={selectedCategories} categoryStats={categoryStats} toggleCategory={toggleCategory} resetFilters={resetFilters} removeFilter={removeFilter} />

            <MobileFilters selectedCategories={selectedCategories} categoryStats={categoryStats} toggleCategory={toggleCategory} resetFilters={resetFilters} />

            <div className="flex items-center justify-between text-sm">
                <div className=" text-muted-foreground">
                    Найдено:{' '}<span className="font-semibold text-foreground">{count}</span>{' '}{materialsWord(count)}
                </div>
                <AddMaterialButton />
            </div>
        </div >
    )
}