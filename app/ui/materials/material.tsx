import Link from "next/link"

import { Calendar, User, ExternalLink, Play, FileText, Link as LinkIcon } from "lucide-react"
import { Share2, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Heart } from "lucide-react"

interface MaterialPageProps {
    material: {
        id: string
        title: string
        previewUrl: string
        author: string
        date: string
        type: string
        typeColor?: string
        isLiked: boolean
        content: {
            type: 'video' | 'article' | 'link' | 'none'
            url?: string
            embedUrl?: string
            introduction?: string
            explanation: string
            conclusion: string
        }
    }
}


export function MaterialPageContent() {
    return (
        <main className="container mx-auto px-4 md:px-6 py-8 max-w-4xl">
            {/* Кнопка возврата */}
            <div className="mb-8">
                <Button
                    variant="ghost"
                    className="gap-2 text-gray-600 hover:text-gray-900 hover:bg-primary/5 dark:text-gray-400 dark:hover:text-gray-200"
                    asChild
                >
                    <Link href="/dashboard/materials">
                        <ChevronLeft className="h-4 w-4 text-primary" />
                        Назад к материалам
                    </Link>
                </Button>
            </div>

            {/* Заголовок и мета-информация */}
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-500 text-white">
                        Образование
                    </span>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="text-sm">07.10.2025</span>
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
                    Как совмещать работу и учёбу и не выгореть?
                </h1>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-gray-500 text-primary" />
                        <a href='#' className="text-gray-700 dark:text-gray-300 font-medium hover:underline decoration-1 underline-offset-4 [text-decoration-skip-ink:none] hover:text-primary transition-all duration-300">Поколение</a>
                    </div>

                    <Button variant="outline" size="sm" className="gap-2 hover:border-primary hover:bg-primary/5">
                        <Heart className="h-6 w-6 text-primary" />
                        {/* когда добавлено */}
                        {/* <Heart className="h-6 w-6 text-primary fill-primary" /> */}
                        Избранное
                    </Button>
                </div>
            </div>

            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-8">
                Большинство студентов рано или поздно сталкиваются с выбором: зарабатывать деньги или сосредоточиться на учебе.
                Но на самом деле не обязательно жертвовать одним ради другого. Главное — выстроить систему.
                Если следовать простым правилам, то можно и учиться успешно, и получать стабильный доход.
            </p>


            {/* Фрейм видео */}
            <div className="mb-8 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg">
                <div className="aspect-video bg-black relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <button className="h-20 w-20 bg-primary/80 hover:bg-primary rounded-full flex items-center justify-center mx-auto mb-4 transition-colors group">
                                <Play className="h-10 w-10 text-white ml-1 group-hover:scale-110 transition-transform" />
                            </button>
                            <p className="text-white/80 text-lg">Видео: Советы по совмещению работы и учебы</p>
                        </div>
                    </div>
                </div>
            </div>

            <Separator className="mb-8 hidden md:block" />

            {/* Основной текст материала */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">

                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
                    5 правил, которые помогают совмещать работу и учёбу
                </h2>

                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">
                    1. Выбирай работу с гибким графиком
                </h3>

                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
                    Самый удобный вариант — это подработка, где ты сам управляешь временем:
                    фриланс (дизайн, копирайтинг, монтаж), репетиторство, курьерская работа
                    с возможностью выбирать заказы.
                </p>

                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-8">
                    Важно уметь договариваться с работодателем: предупреждать заранее о загруженной неделе
                    или о том, что последняя задача была слишком объёмной. Это экономит нервы
                    и позволяет сохранить баланс.
                </p>

                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    2. Думай не только о деньгах в моменте, но и о будущем
                </h3>

                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-12">
                    Когда речь идёт о том, <strong>как совмещать работу и учёбу</strong>, важно помнить:
                    работа должна быть не только источником дохода, но и возможностью для профессионального роста.
                    Выбирай проекты, которые развивают твои навыки и могут стать полезными для будущей карьеры.
                </p>
            </div>

            {/* Вывод */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 border border-blue-200 dark:border-blue-900/30">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    💡 Вывод
                </h2>
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    Совмещение работы и учёбы — это не только вызов, но и возможность развить
                    ценные навыки тайм-менеджмента, дисциплины и профессионального роста.
                    Главное — найти баланс, установить приоритеты и не бояться просить помощи,
                    когда это необходимо. Помни, что забота о ментальном здоровье так же важна,
                    как и академические или профессиональные достижения.
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
                        <a href="/materials">
                            К списку материалов
                        </a>
                    </Button>
                </div>
            </div>
        </main>
    )
}

// Пример использования
export function MaterialPageExample() {
    const exampleMaterial = {
        id: "1",
        title: "Инновации в спортивной подготовке: новые подходы и технологии",
        author: "Иван Козлов",
        date: "2024-03-05",
        type: "Спорт",
        typeColor: "bg-orange-500",
        shortDescription: "В этом материале рассматриваются современные методы спортивной подготовки, включая использование технологий для анализа результатов и индивидуального подхода к тренировкам.",
        content: {
            type: 'video',
            description: 'Видео демонстрирует применение VR-технологий в тренировочном процессе'
        },
        explanation: `Современная спортивная подготовка переживает революцию благодаря внедрению новых технологий. Виртуальная реальность, носимые устройства и анализ больших данных позволяют тренерам создавать персонализированные программы тренировок.\n\nИсследования показывают, что спортсмены, использующие технологические решения в тренировках, показывают на 25% лучшие результаты по сравнению с традиционными методами. Это связано с более точным контролем нагрузки, своевременной корректировкой программ и снижением риска травм.\n\nВажным аспектом является психологическая подготовка, где технологии также играют ключевую роль. Симуляторы соревновательных ситуаций помогают спортсменам адаптироваться к стрессу и улучшить концентрацию.`,
        conclusion: "Интеграция технологий в спортивную подготовку открывает новые горизонты для достижения максимальных результатов. Ключевой задачей становится грамотное сочетание традиционных методик с инновационными подходами для создания эффективных тренировочных программ."
    }

    // return <MaterialPageMain material={exampleMaterial} />
}