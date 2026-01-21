import FilterButton from "@/app/ui/materials/filters/desktop/filter-button"
import { CategoryStat } from "@/lib/types/materials"

interface FiltersGridProps {
    selectedCategories: string[]
    categoryStats: CategoryStat[]
    toggleCategory: (category: string) => void
}

export default function FiltersGrid({ selectedCategories, categoryStats, toggleCategory }: FiltersGridProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categoryStats.map((stats: CategoryStat) => {
                const { id, name, count } = stats
                return (
                    <FilterButton
                        key={id}
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