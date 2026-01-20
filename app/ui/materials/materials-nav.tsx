import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

// import data from '@/app/data/materials.json'
import Search from "@/app/ui/materials/search/search"
import DesktopFilters from "@/app/ui/materials/filters/desktop/filters"
import MobileFilters from "@/app/ui/materials/filters/mobile/filters"

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

export function MaterialsNav({ }) {
    return (
        <div className="space-y-6 mb-8">
            <Search />

            <DesktopFilters />

            <MobileFilters />

            {/* Информация о результатах */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div>
                    Найдено <span className="font-semibold text-foreground">24</span> материала
                </div>
                {/* {selectedFilters.length > 1 && (
                    <Button variant="ghost" size="sm" className="h-8">
                        <X className="h-3 w-3 mr-1" />
                        Сбросить все
                    </Button>
                )} */}
            </div>
        </div>
    )
}