import { NextRequest } from 'next/server'
import data from '@/app/data/materials.json'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)

    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '6')
    const type = searchParams.get('type') || ''
    const search = searchParams.get('search') || ''

    let materials = data.materials
    let filtered = materials
    if (type) {
        filtered = materials.filter(m => m.type === type)
    }

    if (search) {
        filtered = filtered.filter(m =>
            m.title.toLowerCase().includes(search.toLowerCase())
        )
    }

    const start = (page - 1) * limit
    const end = start + limit
    const paginated = filtered.slice(start, end)

    // 4. Возврат данных
    return Response.json({
        data: paginated,
        meta: {
            total: filtered.length,
            page,
            limit,
            totalPages: Math.ceil(filtered.length / limit)
        }
    })
}