import FilterButton from "@/app/ui/materials/filters/desktop/filter-button"

interface FiltersGrid {
    allCategories: string[]
    selectedCategories: string[]
    toggleCategory: (category: string) => void
}

export default function FiltersGrid({ selectedCategories, allCategories, toggleCategory }: FiltersGrid) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {allCategories.map((category) => (
                <FilterButton key={category} category={category} selectedCategories={selectedCategories} toggleCategory={toggleCategory} />
            ))}
        </div>
    )
}