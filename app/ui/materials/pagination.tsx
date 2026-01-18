import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MaterialsPagination() {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t">
            {/* Информация */}
            <div className="text-sm text-muted-foreground">
                Показано <span className="font-semibold text-foreground">1-9</span> из{" "}
                <span className="font-semibold text-foreground">54</span> материалов
            </div>

            {/* Пагинация */}
            <div className="flex items-center gap-1">
                {/* Кнопка назад */}
                <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-xl border-gray-300 dark:border-gray-700 hover:border-primary hover:bg-primary/5"
                    disabled
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Страницы */}
                <div className="flex items-center gap-1 mx-2">
                    <Button
                        variant="default"
                        size="icon"
                        className="h-10 w-10 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                        1
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-xl border-gray-300 dark:border-gray-700 hover:border-primary hover:bg-primary/5"
                    >
                        2
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-xl border-gray-300 dark:border-gray-700 hover:border-primary hover:bg-primary/5"
                    >
                        3
                    </Button>

                    <span className="mx-1 text-muted-foreground">...</span>

                    <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-xl border-gray-300 dark:border-gray-700 hover:border-primary hover:bg-primary/5"
                    >
                        6
                    </Button>
                </div>

                {/* Кнопка вперед */}
                <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-xl border-gray-300 dark:border-gray-700 hover:border-primary hover:bg-primary/5"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>

            {/* Выбор количества на странице */}
            <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">На странице:</span>
                <div className="flex bg-muted rounded-lg p-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-3 rounded-md bg-background text-foreground shadow-sm"
                    >
                        9
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-3 rounded-md hover:bg-transparent hover:text-foreground"
                    >
                        18
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-3 rounded-md hover:bg-transparent hover:text-foreground"
                    >
                        27
                    </Button>
                </div>
            </div>
        </div>
    )
}