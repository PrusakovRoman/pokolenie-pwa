import FiltersNav from "@/app/ui/materials/filters/desktop/filters-nav"
import FiltersGrid from "@/app/ui/materials/filters/desktop/filters-grid"
import SelectedFilters from "@/app/ui/materials/filters/desktop/selected-filters"

interface DesctopFiltersProps {
    selectedCategories: string[]
    toggleCategory: (categoryId: string) => void
    resetFilters: () => void
}

export default function DesktopFilters({ selectedCategories, toggleCategory, resetFilters }: DesctopFiltersProps) {
    return (
        <div className="hidden lg:block bg-muted/50 rounded-xl p-4">
            <FiltersNav resetFilters={resetFilters} />

            <FiltersGrid selectedCategories={selectedCategories} toggleCategory={toggleCategory} />

            <SelectedFilters selectedCategories={selectedCategories} resetFilters={resetFilters} />
        </div>
    )
}

