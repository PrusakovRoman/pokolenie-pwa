export interface Material {
    id: string
    title: string
    imageUrl: string
    author: string
    date: string
    category: string
    categoryColor: string
    isLiked: boolean
    content: {
        // type: 'video' | 'article' | 'book'
        type: string
        url?: string
        embedUrl?: string
        introduction?: string
        explanation: string
        conclusion: string
    }
}

export interface Metadata {
    total: number
    page: number
    limit: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
}

export interface CategoryStat {
    id: string
    name: string
    count: number
}

export interface MaterialsResponse {
    data: Material[]
    meta: Metadata
    allCategories: string[]
    categoryStats: CategoryStat[]
} 