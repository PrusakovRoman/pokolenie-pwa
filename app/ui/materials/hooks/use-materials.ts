'use client'

import { useState, useEffect, useCallback } from "react"

export function useMaterials() {
    const [materials, setMaterials] = useState([])
    const [metadata, setMetadata] = useState(null)
    const [selectedCategories, setSelectedCategories] = useState(['all'])
    const [searchQuery, setSearchQuery] = useState('')
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    const fetchMaterials = useCallback(async () => {
        setIsLoading(true)

        const params = new URLSearchParams({ page: page.toString(), limit: '6' })

        if (!selectedCategories.includes('all') && selectedCategories.length) {
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
        } catch (error) {
            console.log('ошибка в useMaterials: ', error)
        } finally {
            setIsLoading(false)
        }

    }, [page, selectedCategories, searchQuery])

    useEffect(() => {
        fetchMaterials()
    }, [fetchMaterials])


    const toggleCategory = (categoryId: string) => {
        if (categoryId === 'all') {
            setSelectedCategories(['all'])
        } else {
            const newCategories = selectedCategories.includes(categoryId) ? selectedCategories.filter(c => c !== categoryId) : [...selectedCategories.filter(c => c !== 'all'), categoryId]
            setSelectedCategories(newCategories.length ? newCategories : ['all'])
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

    const resetFilters = () => {
        setSelectedCategories(['all'])
        setSearchQuery('')
        setPage(1)
    }

    return {
        materials,
        metadata,

        selectedCategories,
        searchQuery,
        page,
        isLoading,

        toggleCategory,
        setSearchQuery,
        goToPage,
        resetFilters,
        fetchMaterials
    }
}