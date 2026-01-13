import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function MaterialsPage() {
    const filters = ["Все", "Курсы", "Вебинары", "Статьи"]
    const selectedFilter = "Все"

    return (
        <div className="container max-w-2xl mx-auto p-4">
            {/* Заголовок */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Материалы</h1>
                <p className="text-muted-foreground mt-2">
                    Закрытая библиотека для участников проекта
                </p>
            </div>

            {/* Поиск и фильтры */}
            <div className="mb-8 space-y-4">
                <Input placeholder="Поиск материалов..." className="h-12" />

                <div className="flex flex-wrap gap-2">
                    {filters.map((filter) => (
                        <Button
                            key={filter}
                            variant={selectedFilter === filter ? "default" : "outline"}
                            size="sm"
                        >
                            {filter}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Карточки */}
            <div className="space-y-4">
                <Card>
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div>
                                <CardTitle>Основы предпринимательства</CardTitle>
                                <CardDescription className="mt-1">
                                    5 уроков • 2 часа обучения
                                </CardDescription>
                            </div>
                            <Badge variant="secondary">Курс</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Пошаговый курс для начинающих предпринимателей
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Начать курс</Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div>
                                <CardTitle>Вебинар: Привлечение инвестиций</CardTitle>
                                <CardDescription className="mt-1">
                                    1 час 20 мин • 12.01.2024
                                </CardDescription>
                            </div>
                            <Badge variant="outline">Вебинар</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Разбор реальных кейсов и питч-деков
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">
                            Смотреть запись
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}