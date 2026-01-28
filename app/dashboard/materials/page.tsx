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
        categoryStats,
        searchQuery,
        page,
        isLoading,

        toggleCategory,
        setSearchQuery,
        goToPage,
        resetFilters,
        removeFilter,
        fetchMaterials,
    } = useMaterials()
    return (
        <div className="min-h-screen bg-background p-4 md:p-6">
            <div className="container mx-auto">
                <SectionHeader />

                <MaterialsNav metadata={metadata} selectedCategories={selectedCategories} categoryStats={categoryStats} searchQuery={searchQuery} toggleCategory={toggleCategory} setSearchQuery={setSearchQuery} resetFilters={resetFilters} removeFilter={removeFilter} />

                <MaterialsGrid materials={materials} isLoading={isLoading} />

                {metadata && metadata.totalPages > 1 && (
                    <MaterialsPagination
                        currentPage={page}
                        totalPages={metadata.totalPages}
                        onPageChange={goToPage}
                    />)}

            </div>
        </div>
    )
}