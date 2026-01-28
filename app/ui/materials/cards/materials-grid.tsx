'use client';

import { useEffect, useState } from "react";
import { MaterialCard } from "./card"
import { Material } from "@/lib/types/materials"
import { deleteMaterial } from "@/app/lib/actions";

interface MaterialsGridProps {
    materials: Material[],
    isLoading: boolean,
    onDelete: (id: string) => void
}

export function MaterialsGrid({ materials, isLoading, onDelete }: MaterialsGridProps) {
    const [currentMaterials, setCurrentMaterials] = useState(materials);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        setCurrentMaterials(materials);
    }, [materials]);

    const handleDelete = async (deletedId: string) => {
        if (!onDelete) return;

        try {
            setIsRefreshing(true);
            // Вызываем переданную функцию удаления
            await onDelete(deletedId);
            // Локально удаляем материал
            setCurrentMaterials(prev => prev.filter(m => m.id !== deletedId));
        } catch (error) {
            console.error('Delete error:', error);
        } finally {
            setIsRefreshing(false);
        }
    };

    if (isLoading || isRefreshing) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2 xs:p-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                        <div className="h-48 bg-gray-200 rounded-2xl mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                ))}
            </div>
        );
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
                    onDelete={handleDelete}
                />
            ))}
        </div>
    )
}