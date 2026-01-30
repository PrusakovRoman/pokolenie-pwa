'use client';

import { useEffect, useState } from "react";
import { MaterialCard } from "./card"
import { Material } from "@/lib/types/materials"
import { MaterialsGridSkeleton } from "@/app/ui/skeletons";

interface MaterialsGridProps {
    materials: Material[],
    isLoading: boolean,
}

export function MaterialsGrid({ materials, isLoading }: MaterialsGridProps) {
    const [currentMaterials, setCurrentMaterials] = useState(materials);

    useEffect(() => {
        setCurrentMaterials(materials);
    }, [materials]);

    if (isLoading) {
        return <MaterialsGridSkeleton />;
    }

    if (currentMaterials.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Материалы не найдены</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2 xs:p-6">
            {currentMaterials.map((material) => (
                <MaterialCard
                    key={material.id}
                    material={material}
                />
            ))}
        </div>
    )
}