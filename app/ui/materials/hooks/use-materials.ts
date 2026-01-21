'use client'

import { useState, useEffect, useCallback } from "react"

import { Material, Metadata } from "@/lib/types/materials"

export function useMaterials() {
    const [materials, setMaterials] = useState<Material[]>([])
    const [metadata, setMetadata] = useState<Metadata | null>(null)
    const [selectedCategories, setSelectedCategories] = useState<string[]>(['Все'])
    const [allCategories, setAllCategories] = useState<string[]>(['Все'])
    const [searchQuery, setSearchQuery] = useState('')
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    const fetchMaterials = useCallback(async () => {
        setIsLoading(true)

        const params = new URLSearchParams({ page: page.toString(), limit: '6' })

        if (!selectedCategories.includes('Все') && selectedCategories.length) {
            params.append('category', selectedCategories.join(','))
        }

        if (searchQuery) {
            params.append('search', searchQuery)
        }

        try {
            const res = await fetch(`/api/materials?${params}`)
            const data = await res.json()
            setMaterials(data.data)
            setMetadata(data.meta)

            if (data.allCategories) {
                setAllCategories(data.allCategories)
            }
        } catch (error) {
            console.log('ошибка в useMaterials: ', error)
        } finally {
            setIsLoading(false)
        }

    }, [page, selectedCategories, searchQuery])

    useEffect(() => {
        fetchMaterials()
    }, [fetchMaterials])


    const toggleCategory = (category: string) => {
        if (category === 'Все') {
            setSelectedCategories(['Все'])
        } else {
            const newCategories = selectedCategories.includes(category) ? selectedCategories.filter(c => c !== category) : [...selectedCategories.filter(c => c !== 'Все'), category]
            setSelectedCategories(newCategories.length ? newCategories : ['Все'])
        }
        setPage(1)
    }

    const goToPage = (newPage: number) => {
        if (metadata && newPage >= 1 && newPage <= metadata.totalPages) {
            setPage(newPage)
        } else {
            console.warn('Некорректная страница: ', newPage)
        }
    }

    const resetFilters = (isAllSelected: boolean) => {
        if (isAllSelected) return
        setSelectedCategories(['Все'])
        setSearchQuery('')
        setPage(1)
    }

    const removeFilter = (category: string) => {
        if (category === 'Все') return

        const newCategories = selectedCategories.filter(c => c != category)

        setSelectedCategories(newCategories.length > 0 ? newCategories : ['Все'])
        setPage(1)
    }

    return {
        materials,
        metadata,

        allCategories,
        selectedCategories,
        searchQuery,
        page,
        isLoading,

        toggleCategory,
        setSearchQuery,
        goToPage,
        resetFilters,
        removeFilter,
        fetchMaterials
    }
}