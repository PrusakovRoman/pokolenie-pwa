import { NextRequest, NextResponse } from "next/server"

import data from '@/app/data/materials.json'

import { Material } from "@/lib/types/materials"

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        const material = data.materials.find((m: Material) => m.id === id)

        if (!material) {
            return NextResponse.json(
                { error: 'Материал не найден' },
                { status: 404 }
            )
        }

        return NextResponse.json(material, {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=3600'
            }
        })
    } catch (error) {
        console.error('API error: ', error)
        return NextResponse.json(
            { error: 'Внутренняя ошибка сервера' },
            { status: 500 }
        )
    }
}