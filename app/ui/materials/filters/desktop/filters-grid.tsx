'use client'

import { CategoryStat } from "@/lib/types/materials"
import FilterButton from "@/app/ui/materials/filters/filter-button"
import { FiltersGridSkeleton } from "@/app/ui/skeletons"

interface FiltersGridProps {
    selectedCategories: string[]
    categoryStats: CategoryStat[]
    toggleCategory: (category: string) => void
    isLoading: boolean
}

export default function FiltersGrid({ selectedCategories, categoryStats, toggleCategory, isLoading }: FiltersGridProps) {
    if (isLoading) return <FiltersGridSkeleton />
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categoryStats.map((stats: CategoryStat) => {
                const { id, name, count } = stats
                return (
                    <FilterButton
                        key={id}
                        variant="desktop"
                        category={name}
                        count={count}
                        isSelected={selectedCategories.includes(id)}
                        onClick={() => toggleCategory(id)}
                    />
                )
            })}
        </div>
    )
}