import FiltersNav from "@/app/ui/materials/filters/desktop/filters-nav"
import FiltersGrid from "@/app/ui/materials/filters/desktop/filters-grid"
import SelectedFilters from "@/app/ui/materials/filters/desktop/selected-filters"

interface DesctopFiltersProps {
    allCategories: string[]
    selectedCategories: string[]
    toggleCategory: (category: string) => void
    resetFilters: (isAllSelected: boolean) => void
    removeFilter: (category: string) => void
}

export default function DesktopFilters({ selectedCategories, allCategories, toggleCategory, resetFilters, removeFilter }: DesctopFiltersProps) {
    return (
        <div className="hidden lg:block bg-muted/50 rounded-xl p-4">
            <FiltersNav selectedCategories={selectedCategories} resetFilters={resetFilters} />

            <FiltersGrid selectedCategories={selectedCategories} allCategories={allCategories} toggleCategory={toggleCategory} />

            <SelectedFilters selectedCategories={selectedCategories} resetFilters={resetFilters} removeFilter={removeFilter} />
        </div>
    )
}

