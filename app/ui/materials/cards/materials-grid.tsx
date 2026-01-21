import { MaterialCard } from "./card"

import { Material } from "@/lib/types/materials"

interface MaterialsGridProps {
    materials: Material[],
    isLoading: boolean
}

export function MaterialsGrid({ materials, isLoading }: MaterialsGridProps) {

    if (isLoading) {
        return <div>Загрузка...</div>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2 xs:p-6">
            {materials.map((material, index) => (
                <MaterialCard
                    key={index}
                    material={material}
                />
            ))}
        </div>
    )
}