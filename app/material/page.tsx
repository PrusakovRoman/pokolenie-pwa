import Footer from "@/app/ui/footer"
import Header from "@/app/ui/header"

import { Calendar, User, ExternalLink, Play, FileText, Link as LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

import { MaterialPageExample, MaterialPageContent } from "../ui/materials/material"


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
            {/* <MaterialPageExample/> */}
            <MaterialPageContent />
            <Footer />
        </>
    )
}