import { CategoryStat } from "@/lib/types/materials"
import FilterButton from "@/app/ui/materials/filters/filter-button"

interface FiltersGridProps {
    selectedCategories: string[]
    categoryStats: CategoryStat[]
    toggleCategory: (category: string) => void
}

export default function FiltersGrid({ selectedCategories, categoryStats, toggleCategory }: FiltersGridProps) {
    return (
        <div className="grid grid-cols-2 gap-3">
            {
                categoryStats.map((stats: CategoryStat) => {
                    const { id, name, count } = stats
                    return (
                        <FilterButton
                            key={id}
                            variant="mobile"
                            category={name}
                            count={count}
                            isSelected={selectedCategories.includes(id)}
                            onClick={() => toggleCategory(id)}
                        />
                    )
                })
            }
        </div>
    )
}