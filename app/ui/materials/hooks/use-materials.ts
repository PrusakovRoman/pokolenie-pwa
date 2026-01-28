'use client'

import { useState, useEffect, useCallback } from "react"
import { CategoryStat, Material, Metadata } from "@/lib/types/materials"

export function useMaterials() {
    const [materials, setMaterials] = useState<Material[]>([])
    const [metadata, setMetadata] = useState<Metadata | null>(null)
    const [selectedCategories, setSelectedCategories] = useState<string[]>(['Все'])
    const [categoryStats, setCategoryStats] = useState<CategoryStat[]>([])
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
            const res = await fetch(`/api/materials?${params}`, {
                cache: 'no-store' // Добавляем для свежих данных
            })
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`)
            }
            const data = await res.json()
            setMaterials(data.data)
            setMetadata(data.meta)
            setCategoryStats(data.filteredCategoryStats || [])
        } catch (error) {
            console.log('ошибка в useMaterials: ', error)
        } finally {
            setIsLoading(false)
        }

    }, [page, selectedCategories, searchQuery])

    useEffect(() => {
        fetchMaterials()
    }, [fetchMaterials])

    // Функция удаления материала
    const deleteMaterial = useCallback(async (id: string) => {
        try {
            // 1. Оптимистичное обновление (удаляем сразу из UI)
            setMaterials(prev => prev.filter(m => m.id !== id))

            // 2. Обновляем метаданные (уменьшаем total)
            setMetadata(prev => prev ? {
                ...prev,
                total: prev.total - 1,
                totalPages: Math.ceil((prev.total - 1) / prev.limit)
            } : null)

            // 3. Отправляем запрос на удаление
            const response = await fetch(`/api/materials?id=${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Ошибка при удалении')
            }

            // 4. Пересчитываем статистику категорий
            const deletedMaterial = materials.find(m => m.id === id)
            if (deletedMaterial) {
                setCategoryStats(prev => prev.map(stat =>
                    stat.id === deletedMaterial.category
                        ? { ...stat, count: Math.max(0, stat.count - 1) }
                        : stat
                ))
            }

            // 5. Если на текущей странице стало мало материалов,
            // возможно нужно вернуться на предыдущую страницу
            if (metadata && materials.length === 1 && page > 1) {
                setPage(page - 1)
            }

            return { success: true }
        } catch (error) {
            console.error('Delete error:', error)

            fetchMaterials()

            throw error
        }
    }, [materials, metadata, page, fetchMaterials])

    const toggleCategory = (category: string) => {
        if (category === 'Все') {
            setSelectedCategories(['Все'])
        } else {
            const newCategories = selectedCategories.includes(category)
                ? selectedCategories.filter(c => c !== category)
                : [...selectedCategories.filter(c => c !== 'Все'), category]
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

    const resetFilters = () => {
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
        deleteMaterial
    }
}