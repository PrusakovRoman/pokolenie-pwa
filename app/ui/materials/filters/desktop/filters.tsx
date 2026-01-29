'use client'

import FiltersNav from "@/app/ui/materials/filters/desktop/filters-nav"
import FiltersGrid from "@/app/ui/materials/filters/desktop/filters-grid"
import SelectedFilters from "@/app/ui/materials/filters/desktop/selected-filters"
import { CategoryStat } from "@/lib/types/materials"

interface DesctopFiltersProps {
    selectedCategories: string[]
    categoryStats: CategoryStat[]
    toggleCategory: (category: string) => void
    resetFilters: () => void
    removeFilter: (category: string) => void
}

export default function DesktopFilters({ selectedCategories, categoryStats, toggleCategory, resetFilters, removeFilter }: DesctopFiltersProps) {
    return (
        <div className="hidden lg:block bg-muted/50 rounded-xl p-4">
            <FiltersNav selectedCategories={selectedCategories} resetFilters={resetFilters} />

            <FiltersGrid selectedCategories={selectedCategories} categoryStats={categoryStats} toggleCategory={toggleCategory} />

            <SelectedFilters selectedCategories={selectedCategories} resetFilters={resetFilters} removeFilter={removeFilter} />
        </div>
    )
}

