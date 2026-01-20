import FiltersNav from "@/app/ui/materials/filters/desktop/filters-nav"
import FiltersGrid from "@/app/ui/materials/filters/desktop/filters-grid"
import SelectedFilters from "@/app/ui/materials/filters/desktop/selected-filters"

export default function DesktopFilters() {
    return (
        <div className="hidden lg:block bg-muted/50 rounded-xl p-4">
            <FiltersNav />

            <FiltersGrid />

            <SelectedFilters />
        </div>
    )
}

