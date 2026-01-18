import { MaterialsGrid } from "@/app/ui/materials/materials-grid"
import { MaterialsFiltersAlt } from "@/app/ui/materials/filters"
import { MaterialsPagination } from "@/app/ui/materials/pagination"

export default function Materials() {
    return (
        <div className="min-h-screen bg-background p-4 md:p-6">
            <div className="container mx-auto">
                {/* Заголовок */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Материалы</h1>
                </div>

                {/* Панель поиска и фильтров */}
                <MaterialsFiltersAlt />

                <MaterialsGrid />

                <MaterialsPagination />
            </div>
        </div>
    )
}