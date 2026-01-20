import FilterButton from "@/app/ui/materials/filters/desktop/filter-button"

const materialCategories = [
    { id: "all", label: "Все" },
    { id: "family", label: "Семья" },
    { id: "health", label: "Здоровье" },
    { id: "softSkills", label: "Soft skills" },
    { id: "business", label: "Бизнес" },
    // { id: "sport", label: "Спорт" },
    // { id: "education", label: "Образование" },
    // { id: "technology", label: "Технологии" },
    // { id: "finance", label: "Финансы" },
    // { id: "creativity", label: "Творчество" },
    // { id: "art", label: "Искусство" },
    // { id: "science", label: "Наука" },
]

interface FiltersGrid {
    selectedCategories: string[]
    toggleCategory: (categoryId: string) => void
}

export default function FiltersGrid({ selectedCategories, toggleCategory }: FiltersGrid) {
    return (<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {materialCategories.map((category) => (
            <FilterButton key={category.id} category={category} selectedCategories={selectedCategories} toggleCategory={toggleCategory} />
        ))}
    </div>)
}