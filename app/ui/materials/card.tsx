// components/MaterialCard.tsx
import { Calendar, User, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"

interface MaterialCardProps {
    title: string
    author: string
    date: string
    imageUrl: string
    type: string
    typeColor?: string
    className?: string
}

export function MaterialCard({
    title,
    author,
    date,
    imageUrl,
    type,
    typeColor = "bg-blue-500",
    className
}: MaterialCardProps) {
    return (
        <Link href="/material">
            <article className={cn(
                "group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900",
                "border border-gray-200 dark:border-gray-800",
                "shadow-sm hover:shadow-xl transition-all duration-300",
                "hover:-translate-y-1 h-full flex-col",
                className
            )}>
                {/* Плашка с типом */}
                <div className="absolute top-4 right-4 z-10">
                    <span className={cn(
                        "inline-flex items-center px-3 py-1 rounded-full",
                        "text-xs font-medium text-white",
                        typeColor,
                        "shadow-lg",
                        "group-hover:underline decoration-1 underline-offset-3 [text-decoration-skip-ink: none]  transition-all duration-300"
                    )}>
                        {type}
                    </span>
                </div>
                {/* Изображение */}
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <Image src={imageUrl} alt={title} sizes="(width: 100%) (height: 100%)" className="object-cover transition-transform duration-500 group-hover:scale-110" fill={true} priority />
                    {/* Градиент поверх изображения */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>

                {/* Контент */}
                <div className="p-6 flex flex-col flex-grow">
                    {/* Мета-информация */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3 h-[40px]">
                        <div className="flex items-center gap-1.5">
                            <User className="h-4 w-4" />
                            <span className="font-medium">{author}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(date).toLocaleDateString('ru-RU')}</span>
                        </div>
                    </div>

                    {/* Заголовок */}
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 min-h-[4rem] line-clamp-2 group-hover:text-primary group-hover:underline decoration-2 underline-offset-4 [text-decoration-skip-ink:none] transition-all duration-300">
                        {title}
                    </h3>

                </div>
                {/* Акцентная линия снизу */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </article>
        </Link >
    )
}