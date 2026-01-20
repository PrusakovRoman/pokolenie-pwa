import FilterButton from "@/app/ui/materials/filters/mobile/filter-button"

export default function FiltersGrid() {
    return (
        <div className="grid grid-cols-2 gap-3">
            {
                materialTypes.map((type) => (
                    <FilterButton type={type} />
                ))
            }
        </div>
    )
}