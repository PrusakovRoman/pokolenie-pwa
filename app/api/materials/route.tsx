import { NextRequest } from "next/server";
import data from '@/app/data/materials.json'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)

        const page = Math.max(1, parseInt(searchParams.get('page') || '1'))

        const limit = Math.max(1, parseInt(searchParams.get('limit') || '6'))

        const categoryParam = searchParams.get('category') || ''
        const selectedCategories = categoryParam ? categoryParam.split(',').filter(c => c.trim() !== '') : []

        const searchQuery = searchParams.get('search') || ''

        let materials = data.materials
        let filtered = [...materials]

        if (selectedCategories.length > 0 && !selectedCategories.includes('Все')) {
            filtered = filtered.filter(material => selectedCategories.includes(material.category))
        }

        if (searchQuery.trim() !== '') {
            const searchLower = searchQuery.toLowerCase()
            filtered = filtered.filter(material => material.title.toLowerCase().includes(searchLower))
        }


        const total = filtered.length
        const totalPages = Math.ceil(total / limit)

        const validPage = Math.min(page, totalPages || 1)

        const start = (validPage - 1) * limit
        const end = start + limit
        const paginated = filtered.slice(start, end)

        const allCategories = Array.from(new Set(data.materials.map(m => m.category)))

        return Response.json({
            data: paginated, // Материалы для текущей страницы
            meta: {          // Метаданные для ВСЕХ отфильтрованных материалов
                total,       // Всего материалов (после фильтров)
                page: validPage, // Текущая страница
                limit,       // Лимит на странице
                totalPages,  // Всего страниц
                // Дополнительно 
                hasNextPage: validPage < totalPages,
                hasPrevPage: validPage > 1
            },
            allCategories: ['Все', ...allCategories]
        }, {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        })



    } catch (error) {
        console.error('API error: ', error)

        return Response.json({
            error: 'Внутренняя ошибка сервера',
            message: error instanceof Error ? error.message : 'Unknown error'
        }, {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        })
    }
}