import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from "next/server"

import { Material } from "@/lib/types/materials"

const redis = Redis.fromEnv();


export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        if (!id) {
            return NextResponse.json(
                { error: 'ID материала не указан' },
                { status: 400 }
            )
        }

        const material = await redis.get<Material[]>('materials')
            .then(materials => materials?.find(m => m.id === id))
        // const materialsArray = materials || []

        // const material = materialsArray.find((m: Material) => m.id === id)

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
                'Cache-Control': 'public, max-age=60'
            }
        })
    } catch (error) {
        console.error('API error: ', error)
        return NextResponse.json(
            {
                error: 'Внутренняя ошибка сервера',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        )
    }
}