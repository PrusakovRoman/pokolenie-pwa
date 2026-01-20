import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface SelectedFiltersProps {
    selectedCategories: string[]
    resetFilters: () => void
}

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

export default function SelectedFilters({ selectedCategories, resetFilters }: SelectedFiltersProps) {
    return (<div className="mt-4 pt-4 border-t">
        <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Выбранные фильтры:</span>
            <Button variant="ghost" size="sm" className="h-7 text-xs hover:bg-primary/5" onClick={resetFilters}>
                Очистить все
            </Button>
        </div>
        <div className="flex flex-wrap gap-2">
            {/* {selectedCategories.map(c => {
                return (<Badge key={c} className="gap-1 pl-3 pr-2 py-1.5">
                    {c}
                    <X className="h-3 w-3 ml-1" />
                </Badge>)
            }

            )} */}
            <Badge className="gap-1 pl-3 pr-2 py-1.5">
                Спорт
                <X className="h-3 w-3 ml-1" />
            </Badge>
            <Badge className="gap-1 pl-3 pr-2 py-1.5">
                Образование
                <X className="h-3 w-3 ml-1" />
            </Badge>
            <Badge className="gap-1 pl-3 pr-2 py-1.5">
                Здоровье
                <X className="h-3 w-3 ml-1" />
            </Badge>
        </div>
    </div>)
}