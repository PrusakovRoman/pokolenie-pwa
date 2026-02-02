'use client'

import { Play, ExternalLink } from "lucide-react"
import { useState } from "react"
import { VideoPlayer } from "@/app/ui/material/video-player"

interface MediaContentProps {
    type: 'article' | 'video' | 'book'
    imageUrl: string
    title: string
    textUrl?: string
    videoUrl?: string
}

export function MediaContent({ type, imageUrl, title, textUrl, videoUrl }: MediaContentProps) {
    const [showVideoPlayer, setShowVideoPlayer] = useState(false)
    const getButtonLabel = () => {
        switch (type) {
            case 'video': return 'Смотреть видео'
            case 'article': return 'Читать статью'
            case 'book': return 'Открыть книгу'
            default: return 'Открыть материал'
        }
    }

    return (
        <>
            {showVideoPlayer && videoUrl && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                    <div className="max-w-4xl w-full">
                        <VideoPlayer
                            videoUrl={videoUrl}
                            title={title}
                            previewUrl={imageUrl}
                            onClose={() => setShowVideoPlayer(false)}
                            isFullscreen
                        />
                    </div>
                </div>
            )}

            <div className="mb-8 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-video relative">
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
                                    onClick={() => setShowVideoPlayer(true)}
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-full font-medium transition-all hover:scale-105"
                                >
                                    <Play className="h-5 w-5" />
                                    <span>{getButtonLabel()}</span>
                                </button>
                            ) : (
                                <a
                                    href={textUrl}
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
                </div>
            </div>
        </>
    )
}