import Footer from "@/app/ui/footer"
import Header from "@/app/ui/header"

import { MaterialPageContent } from "@/app/ui/materials/material"


interface MaterialPageProps {
    material: {
        id: string
        title: string
        author: string
        date: string
        type: string
        typeColor?: string
        shortDescription: string
        content: {
            type: 'video' | 'article' | 'link' | 'none'
            url?: string
            embedUrl?: string
            title?: string
            description?: string
        }
        explanation: string
        conclusion: string
    }
}

export default function Page({ material }: MaterialPageProps) {
    return (
        <>
            <Header />
            <MaterialPageContent />
            <Footer />
        </>
    )
}