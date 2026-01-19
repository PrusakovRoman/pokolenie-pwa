import { MaterialsGrid } from "@/app/ui/materials/materials-grid"
import { MaterialsFiltersAlt } from "@/app/ui/materials/filters"
import { MaterialsPagination } from "@/app/ui/materials/pagination"

async function getMaterials(page = 1, type = '') {
    const url = `http://localhost:3000/api/materials?page=${page}&limit=6${type ? `&type=${type}` : ''}`
    const res = await fetch(url, { cache: 'no-store' })
    return res.json()
}

export default async function Materials() {
    const { data: materials, meta } = await getMaterials()

    return (
        <div className="min-h-screen bg-background p-4 md:p-6">
            <div className="container mx-auto">

                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Материалы</h1>
                </div>
                <MaterialsFiltersAlt />

                <MaterialsGrid materials={materials} />

                <MaterialsPagination />
            </div>
        </div>
    )
}