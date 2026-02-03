'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, X, Loader2 } from 'lucide-react'

interface VideoPlayerProps {
    videoUrl: string
    title: string
    previewUrl?: string
    onClose?: () => void
    isFullscreen?: boolean
}

export function VideoPlayer({
    videoUrl,
    title,
    previewUrl,
    onClose,
    isFullscreen = false
}: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(1)
    const [isMuted, setIsMuted] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isFullscreenMode, setIsFullscreenMode] = useState(isFullscreen)
    const [playbackRate, setPlaybackRate] = useState(1)

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const handleLoadedData = () => {
            setIsLoading(false)
            setDuration(video.duration)
        }

        const handleTimeUpdate = () => {
            setCurrentTime(video.currentTime)
        }

        const handleEnded = () => {
            setIsPlaying(false)
            video.currentTime = 0
        }

        video.addEventListener('loadeddata', handleLoadedData)
        video.addEventListener('timeupdate', handleTimeUpdate)
        video.addEventListener('ended', handleEnded)

        return () => {
            video.removeEventListener('loadeddata', handleLoadedData)
            video.removeEventListener('timeupdate', handleTimeUpdate)
            video.removeEventListener('ended', handleEnded)
        }
    }, [])

    const togglePlay = () => {
        const video = videoRef.current
        if (!video) return

        if (isPlaying) {
            video.pause()
        } else {
            video.play().catch(console.error)
        }
        setIsPlaying(!isPlaying)
    }

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value)
        const video = videoRef.current
        if (video) {
            video.currentTime = value
            setCurrentTime(value)
        }
    }

    const toggleMute = () => {
        const video = videoRef.current
        if (video) {
            video.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value)
        const video = videoRef.current
        if (video) {
            video.volume = value
            setVolume(value)
            setIsMuted(value === 0)
        }
    }

    const toggleFullscreen = () => {
        if (!containerRef.current) return

        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().catch(console.error)
            setIsFullscreenMode(true)
        } else {
            document.exitFullscreen()
            setIsFullscreenMode(false)
        }
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`
    }

    return (
        <div
            ref={containerRef}
            className={`relative bg-black rounded-xl overflow-hidden ${isFullscreenMode ? 'fixed inset-0 z-50' : ''}`}
        >
            <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/70 to-transparent">
                <h3 className="text-white font-semibold truncate">{title}</h3>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-full transition"
                    >
                        <X className="h-5 w-5 text-white" />
                    </button>
                )}
            </div>

            <div className="relative aspect-video">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <Loader2 className="h-12 w-12 text-white animate-spin" />
                    </div>
                )}

                <video
                    ref={videoRef}
                    className="w-full h-full object-contain"
                    src={videoUrl}
                    poster={previewUrl}
                    preload="metadata"
                    onClick={togglePlay}
                />

                {!isPlaying && previewUrl && (
                    <div
                        className="absolute inset-0 bg-cover bg-center cursor-pointer"
                        style={{ backgroundImage: `url(${previewUrl})` }}
                        onClick={togglePlay}
                    >
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <button className="p-4 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition">
                                <Play className="h-16 w-16 text-white" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <div className="mb-4">
                    <input
                        type="range"
                        min="0"
                        max={duration || 100}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                    />
                    <div className="flex justify-between text-sm text-gray-300 mt-1">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={togglePlay}
                            className="p-2 hover:bg-white/20 rounded-full transition"
                        >
                            {isPlaying ? (
                                <Pause className="h-6 w-6 text-white" />
                            ) : (
                                <Play className="h-6 w-6 text-white" />
                            )}
                        </button>

                        <button
                            onClick={toggleMute}
                            className="p-2 hover:bg-white/20 rounded-full transition"
                        >
                            {isMuted ? (
                                <VolumeX className="h-6 w-6 text-white" />
                            ) : (
                                <Volume2 className="h-6 w-6 text-white" />
                            )}
                        </button>

                        <div className="w-24">
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={isMuted ? 0 : volume}
                                onChange={handleVolumeChange}
                                className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                            />
                        </div>

                        <select
                            value={playbackRate}
                            onChange={(e) => {
                                const rate = parseFloat(e.target.value)
                                setPlaybackRate(rate)
                                if (videoRef.current) {
                                    videoRef.current.playbackRate = rate
                                }
                            }}
                            className="bg-black/50 text-white text-sm p-1 rounded"
                        >
                            <option value="0.5">0.5x</option>
                            <option value="1">1x</option>
                            <option value="1.5">1.5x</option>
                            <option value="2">2x</option>
                        </select>
                    </div>

                    <button
                        onClick={toggleFullscreen}
                        className="p-2 hover:bg-white/20 rounded-full transition"
                    >
                        <Maximize className="h-6 w-6 text-white" />
                    </button>
                </div>
            </div>
        </div>
    )
}