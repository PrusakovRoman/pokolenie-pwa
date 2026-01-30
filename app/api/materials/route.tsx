import { NextRequest } from "next/server";
import { Redis } from '@upstash/redis';

import type { Material } from "@/lib/types/materials";

const redis = Redis.fromEnv();

async function readData(): Promise<{ materials: Material[] }> {
    try {
        const materials = await redis.get<Material[]>('materials')
        return { materials: materials || [] };
    } catch (error) {
        console.error('Error reading from Redis:', error);
        return { materials: [] };
    }
}

async function writeData(data: { materials: Material[] }): Promise<void> {
    try {
        await redis.set('materials', data.materials)
    } catch (error) {
        console.error('Error writing to Redis:', error);
    }
}

export async function GET(request: NextRequest) {
    try {
        const data = await readData();
        const materials: Material[] = data.materials;

        const { searchParams } = new URL(request.url)

        const page = Math.max(1, parseInt(searchParams.get('page') || '1'))

        const limit = Math.max(1, parseInt(searchParams.get('limit') || '6'))

        const categoryParam = searchParams.get('category') || ''
        const selectedCategories = categoryParam ? categoryParam.split(',').filter(c => c.trim() !== '') : []

        const searchQuery = searchParams.get('search') || ''

        let filtered = [...materials]

        if (selectedCategories.length > 0 && !selectedCategories.includes('Все')) {
            filtered = filtered.filter(material => selectedCategories.includes(material.category))
        }

        if (searchQuery.trim() !== '') {
            const searchLower = searchQuery.toLowerCase()
            filtered = filtered.filter(material =>
                material.title.toLowerCase().includes(searchLower)
            )
        }

        const uniqueCategories = Array.from(new Set(materials.map(m => m.category)))

        const categoryStats = uniqueCategories.map(category => {
            const materialsInCategory = materials.filter(m => m.category === category)

            let filteredInCategory = [...materialsInCategory]

            if (searchQuery.trim() !== '') {
                const searchLower = searchQuery.toLowerCase()
                filteredInCategory = filteredInCategory.filter(material => material.title.toLowerCase().includes(searchLower))
            }

            return {
                id: category,
                name: category,
                count: filteredInCategory.length,
            }
        })

        const allCategory = {
            id: 'Все',
            name: 'Все',
            count: searchQuery.trim() !== '' ? materials.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase())).length : materials.length
        }

        const categoriesStats = [allCategory, ...categoryStats]

        const total = filtered.length
        const totalPages = Math.ceil(total / limit)

        const validPage = Math.min(page, totalPages || 1)

        const start = (validPage - 1) * limit
        const end = start + limit
        const paginated = filtered.slice(start, end)

        return Response.json({
            data: paginated, // Материалы для текущей страницы
            meta: {          // Метаданные для ВСЕХ отфильтрованных материалов
                total,       // Всего материалов (после фильтров)
                page: validPage, // Текущая страница
                limit,       // Лимит на странице
                totalPages,  // Всего страниц
                hasNextPage: validPage < totalPages,
                hasPrevPage: validPage > 1
            },
            filteredCategoryStats: categoriesStats
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

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const data = await readData()
        const materials: Material[] = data.materials

        const newMaterial: Material = {
            id: Date.now().toString(),
            ...body,
            createdAt: new Date().toISOString()
        };

        materials.unshift(newMaterial);

        await writeData({ materials })

        return Response.json({
            success: true,
            material: newMaterial
        }, {
            status: 201
        });

    } catch (error) {
        console.error('POST error:', error);
        return Response.json({
            error: 'Failed to add material',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, {
            status: 500
        });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return Response.json({
                error: 'ID материала не указан'
            }, {
                status: 400
            });
        }

        const data = await readData()
        const materials: Material[] = data.materials

        const materialIndex = materials.findIndex((m: Material) => m.id === id);

        if (materialIndex === -1) {
            return Response.json({
                error: 'Материал не найден'
            }, {
                status: 404
            });
        }

        const deletedMaterial = materials[materialIndex];
        materials.splice(materialIndex, 1);

        await writeData({ materials })

        return Response.json({
            success: true,
            deleted: deletedMaterial
        }, {
            status: 200
        });

    } catch (error) {
        console.error('Delete error:', error);
        return Response.json({
            error: 'Ошибка при удалении материала',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, {
            status: 500
        });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const body = await request.json();

        if (!id) {
            return Response.json({
                error: 'ID материала не указан'
            }, {
                status: 400
            });
        }

        const data = await readData()
        const materials: Material[] = data.materials

        const materialIndex = materials.findIndex((m: Material) => m.id === id);

        if (materialIndex === -1) {
            return Response.json({
                error: 'Материал не найден'
            }, {
                status: 404
            });
        }

        // Обновляем материал
        materials[materialIndex] = {
            ...materials[materialIndex],
            ...body,
            updatedAt: new Date().toISOString()
        };

        await writeData({ materials })

        return Response.json({
            success: true,
            material: materials[materialIndex]
        }, {
            status: 200
        });

    } catch (error) {
        console.error('Update error:', error);
        return Response.json({
            error: 'Ошибка при обновлении материала',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, {
            status: 500
        });
    }
}