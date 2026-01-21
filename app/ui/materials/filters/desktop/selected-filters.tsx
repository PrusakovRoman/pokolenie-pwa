import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface SelectedFiltersProps {
    selectedCategories: string[]
    resetFilters: (isAllSelected: boolean) => void
    removeFilter: (category: string) => void
}

export default function SelectedFilters({ selectedCategories, resetFilters, removeFilter }: SelectedFiltersProps) {
    const isAllSelected = selectedCategories.includes('all')
    return (
        <div className="mt-4 pt-4 border-t">
            <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Выбранные фильтры:</span>
                <Button variant="ghost" size="sm" className="h-7 text-xs hover:bg-primary/5" onClick={() => resetFilters(isAllSelected)}>
                    Очистить все
                </Button>
            </div>
            <div className="flex flex-wrap gap-2">
                {selectedCategories.map(category => category !== 'Все' ?
                    <Badge key={category} className="gap-1 pl-3 pr-2 py-1.5">
                        {category}
                        <Button variant="ghost" className="h-3 w-3 ml-1" onClick={() => removeFilter(category)}>
                            <X className="h-3 w-3" />
                        </Button>
                    </Badge> : <Badge key={category} className="gap-1 px-3 py-1.5">
                        {category}
                    </Badge>
                )}
            </div>
        </div>
    )
}