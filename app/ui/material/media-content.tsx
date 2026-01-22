'use client'

import { Play, ExternalLink, FileText, BookOpen } from "lucide-react"
import { useState } from "react"

interface MediaContentProps {
    type: 'article' | 'video' | 'book'
    imageUrl: string
    title: string
    contentUrl?: string
    embedUrl?: string
}

export function MediaContent({ type, imageUrl, title, contentUrl, embedUrl }: MediaContentProps) {
    const [isPlaying, setIsPlaying] = useState(false)

    const handlePlay = () => {
        if (type === 'video' && embedUrl) {
            setIsPlaying(true)
        }
    }

    const getButtonLabel = () => {
        switch (type) {
            case 'video': return 'Смотреть видео'
            case 'article': return 'Читать статью'
            case 'book': return 'Открыть книгу'
            default: return 'Открыть материал'
        }
    }

    return (
        <div className="mb-8 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="aspect-video relative">

                {type === 'video' && embedUrl && isPlaying ? (
                    <div className="w-full h-full bg-black">
                        <iframe
                            src={embedUrl}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={title}
                            loading="lazy"
                        />
                    </div>
                ) : (
                    <>
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${imageUrl})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        />

                        <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />

                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">

                            <div className="mb-6 space-y-2">
                                <h3 className="text-white text-xl md:text-2xl font-semibold max-w-2xl">
                                    {title}
                                </h3>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                {type === 'video' ? (
                                    <button
                                        onClick={handlePlay}
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-full font-medium transition-all hover:scale-105"
                                    >
                                        <Play className="h-5 w-5" />
                                        <span>{getButtonLabel()}</span>
                                    </button>
                                ) : (
                                    <a
                                        href={contentUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-full font-medium transition-all hover:scale-105"
                                    >
                                        <ExternalLink className="h-5 w-5" />
                                        <span>{getButtonLabel()}</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>

        </div>
    )
}