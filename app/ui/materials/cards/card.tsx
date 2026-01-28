'use client'
import { Calendar, User, Pencil } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { Material } from "@/lib/types/materials"

interface MaterialCardProps {
    material: Material
    onDelete?: (id: string) => void
}

export function MaterialCard({ material, onDelete }: MaterialCardProps) {
    return (
        <Link href={`/material/${material.id}`}>
            <article className=
                "group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex-col">
                <div className="absolute top-4 right-4 z-10">
                    <span className={cn(
                        "inline-flex items-center px-3 py-1 rounded-full",
                        "text-xs font-medium text-white",
                        material.categoryColor,
                        "shadow-lg",
                        "group-hover:underline decoration-1 underline-offset-3 [text-decoration-skip-ink: none]  transition-all duration-300"
                    )}>
                        {material.category}
                    </span>
                </div>

                <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <Image src={material.imageUrl} alt={material.title} sizes="(width: 100%) (height: 100%)" className="object-cover transition-transform duration-500 group-hover:scale-110" fill={true} priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    <div className="flex items-center justify-end gap-2 absolute bottom-4 right-4">
                        <div className="backdrop-blur-md bg-white/40 dark:bg-black/20 p-2 rounded-xl shadow-lg border border-white/30 dark:border-black/30">
                            <div className="flex items-center">
                                <Link
                                    href={`/modifyMaterial/edit/${material.id}`}
                                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                    aria-label="Редактировать"
                                >
                                    <Pencil className="w-5 h-5 text-green-700/80 hover:text-green-700  drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3 h-[40px]">
                        <div className="flex items-center gap-1.5">
                            <User className="h-4 w-4" />
                            <span className="font-medium">{material.author}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(material.date).toLocaleDateString('ru-RU')}</span>
                        </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 min-h-[4rem] line-clamp-2 group-hover:text-primary group-hover:underline decoration-2 underline-offset-4 [text-decoration-skip-ink:none] transition-all duration-300">
                        {material.title}
                    </h3>

                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </article>
        </Link >
    )
}