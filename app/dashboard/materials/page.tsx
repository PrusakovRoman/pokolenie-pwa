'use client'

import { MaterialsGrid } from "@/app/ui/materials/cards/materials-grid"
import { MaterialsNav } from "@/app/ui/materials/materials-nav"
import { MaterialsPagination } from "@/app/ui/materials/pagination/pagination"
import SectionHeader from "@/app/ui/dashboard/section-header"

import { useMaterials } from "@/app/ui/materials/hooks/use-materials"

export default function Materials() {

    const {
        materials,
        metadata,

        selectedCategories,
        searchQuery,
        page,
        isLoading,

        toggleCategory,
        setSearchQuery,
        goToPage,
        resetFilters } = useMaterials()


    return (
        <div className="min-h-screen bg-background p-4 md:p-6">
            <div className="container mx-auto">
                {/* если не сработает pathname, можно просто прокидывать пропс */}
                <SectionHeader />

                <MaterialsNav />

                <MaterialsGrid />

                {/* <MaterialsPagination /> */}
            </div>
        </div>
    )
}