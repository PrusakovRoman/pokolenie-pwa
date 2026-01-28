import Footer from "@/app/ui/footer"
import Header from "@/app/ui/header"
import Link from "next/link"

import { cn } from "@/lib/utils"
import MaterialNotFound from '@/app/material/[id]/not-found'
import { MediaContent } from "@/app/ui/material/media-content"
import { fetchMaterial } from "@/app/lib/actions"

import { Calendar, User, Link as LinkIcon } from "lucide-react"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Heart } from "lucide-react"
import LinkToMaterials from "@/app/ui/link-to-materials"

interface MaterialPageProps {
    params: Promise<{ id: string }>
}

export default async function Page({ params }: MaterialPageProps) {
    const { id } = await params

    if (!id) return <MaterialNotFound />

    const material = await fetchMaterial(id)

    if (!material) return <MaterialNotFound />

    const contentType = material.type || 'article'
    const contentUrl = material.url || material.embedUrl

    return (
        <>
            <Header />
            <main className="container mx-auto p-4 xs:py-8 md:px-6 max-w-4xl">
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        className="gap-2 text-gray-600 hover:text-gray-900 hover:bg-primary/5 dark:text-gray-400 dark:hover:text-gray-200"
                        asChild
                    >
                        {/* <Link href="/dashboard/materials">
                            <ChevronLeft className="h-4 w-4 text-primary" />
                            Назад к материалам
                        </Link> */}
                        <LinkToMaterials />
                    </Button>
                </div>

                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className={cn("inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium text-white", material.categoryColor)}>
                            {material.category}
                        </span>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span className="text-sm">{material.date}</span>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
                        {material.title}
                    </h1>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <User className="h-5 w-5 text-gray-500 text-primary" />
                            <Link href='/mentor' className="text-gray-700 dark:text-gray-300 font-medium hover:underline decoration-1 underline-offset-4 [text-decoration-skip-ink:none] hover:text-primary transition-all duration-300">{material.author}</Link>
                        </div>

                        <Button variant="outline" size="sm" className="gap-2 hover:border-primary hover:bg-primary/5">
                            <Heart className="h-6 w-6 text-primary" />
                            {/* когда добавлено */}
                            {/* <Heart className="h-6 w-6 text-primary fill-primary" /> */}
                            Избранное
                        </Button>
                    </div>
                </div>

                {material.introduction && (<p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-8">
                    {material.introduction}
                </p>)}

                <MediaContent
                    type={contentType}
                    imageUrl={material.imageUrl}
                    title={material.title}
                    contentUrl={contentType !== 'video' ? material?.url : undefined}
                    embedUrl={contentType === 'video' ? material?.embedUrl : undefined}
                />

                <Separator className="mb-8 hidden md:block" />

                <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                    {material.explanation ? (<p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
                        {material.explanation}
                    </p>) : (<p>Контент скоро появится!</p>)}
                </div>

                {/* Вывод */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 border border-blue-200 dark:border-blue-900/30">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        💡 Вывод
                    </h2>
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                        {material.conclusion}
                    </p>
                </div>

                {/* Кнопки навигации */}
                <div className="mt-12 pt-8 border-t">
                    <div className="flex justify-center">
                        <Button
                            variant="ghost"
                            className="gap-2 text-gray-600 hover:text-gray-900 hover:bg-primary/5"
                            asChild
                        >
                            <Link href="/dashboard/materials">
                                К списку материалов
                            </Link>
                        </Button>
                    </div>
                </div>
            </main >
            <Footer />
        </>
    )
}