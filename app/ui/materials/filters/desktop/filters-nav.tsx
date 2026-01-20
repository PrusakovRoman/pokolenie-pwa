import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"

export default function FiltersNav() {
    return (<div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Фильтры</h3>
        </div>
        <Button className="hover:bg-primary/5" variant="ghost" size="sm">
            Сбросить всё
        </Button>
    </div>)
}