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
        type: string
        url?: string
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