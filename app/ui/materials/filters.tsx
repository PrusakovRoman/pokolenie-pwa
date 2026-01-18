'use client'

import { Search, Filter, X, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"

// Типы материалов для фильтра
const materialTypes = [
    { id: "all", label: "Все" },
    { id: "sport", label: "Спорт" },
    { id: "education", label: "Образование" },
    { id: "family", label: "Семья" },
    { id: "health", label: "Здоровье" },
    { id: "psychology", label: "Психология" },
    { id: "technology", label: "Технологии" },
    { id: "finance", label: "Финансы" },
    { id: "creativity", label: "Творчество" },
    { id: "art", label: "Искусство" },
    { id: "science", label: "Наука" },
    { id: "business", label: "Бизнес" },
]

export function MaterialsFiltersAlt() {
    const [isFiltersOpen, setIsFiltersOpen] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState(["all"])

    return (
        <div className="space-y-6 mb-8">
            {/* Поиск */}
            <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-hover:text-primary group-focus-within:text-primary transition-colors duration-200" />
                <Input
                    placeholder="Найти материал..."
                    className="pl-12 pr-12 h-14 text-lg rounded-xl border-2 transition-all duration-200 focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 hover:bg-primary/5"
                >
                    <X className="h-5 w-5" />
                </Button>
            </div>

            {/* Десктоп версия фильтров */}
            <div className="hidden lg:block bg-muted/50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Filter className="h-5 w-5" />
                        <h3 className="text-lg font-semibold">Фильтры</h3>
                    </div>
                    <Button className="hover:bg-primary/5" variant="ghost" size="sm">
                        Сбросить всё
                    </Button>
                </div>

                {/* Грид с фильтрами для десктопа */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {materialTypes.map((type) => (
                        <FilterButton key={type.id} type={type} isSelected={selectedFilters.includes(type.id)} />
                    ))}
                </div>

                {/* Выбранные фильтры */}
                <SelectedFilters />
            </div>

            {/* Мобильная версия фильтров */}
            <div className="lg:hidden">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                            <div className="flex items-center gap-2">
                                <Filter className="h-4 w-4" />
                                <span>Фильтры</span>
                                <Badge variant="secondary" className="ml-2">
                                    3
                                </Badge>
                            </div>
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-screen max-w-[calc(100vw-2rem)] mx-4 p-0">
                        <div className="max-h-[60vh] overflow-y-auto p-4">
                            <div className="grid grid-cols-2 gap-3">
                                {materialTypes.map((type) => (
                                    <button
                                        key={type.id}
                                        className={`
                    p-3 rounded-lg border text-sm font-medium transition-colors
                    ${type.id === "all"
                                                ? "border-primary bg-primary/10 text-primary"
                                                : "border-gray-200 hover:border-primary"
                                            }
                  `}
                                    >
                                        {type.label}
                                    </button>
                                ))}
                            </div>

                            <div className="flex gap-3 mt-6 pt-4 border-t">
                                <Button variant="outline" className="flex-1">
                                    Сбросить
                                </Button>
                                <Button className="flex-1">
                                    Применить
                                </Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            {/* Информация о результатах */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div>
                    Найдено <span className="font-semibold text-foreground">24</span> материала
                </div>
                {selectedFilters.length > 1 && (
                    <Button variant="ghost" size="sm" className="h-8">
                        <X className="h-3 w-3 mr-1" />
                        Сбросить все
                    </Button>
                )}
            </div>
        </div>
    )
}

// Компонент кнопки фильтра
function FilterButton({ type, isSelected }: { type: { id: string, label: string }, isSelected: boolean }) {
    return (
        <button
            className={`
        relative border rounded-lg p-3 cursor-pointer transition-all
        hover:border-primary hover:bg-primary/5
        ${isSelected ? "border-primary bg-primary/5" : "border-border"}
        flex flex-col items-center justify-center text-center min-h-[80px]
      `}
        >
            <div className="flex items-center gap-2 mb-1">
                <div className={`
          h-5 w-5 rounded border flex items-center justify-center flex-shrink-0
          ${isSelected ? "border-primary bg-primary" : "border-muted-foreground"}
        `}>
                    {isSelected && (
                        <div className="h-2 w-2 bg-white rounded-full" />
                    )}
                </div>
                <span className={`
          text-sm font-medium truncate max-w-full
          ${isSelected ? "text-primary" : "text-foreground"}
        `}>
                    {type.label}
                </span>
            </div>
            {type.id !== "all" && (
                <div className="text-xs text-muted-foreground mt-1">
                    12 материалов
                </div>
            )}
        </button>
    )
}

// Компонент выбранных фильтров
function SelectedFilters() {
    return (
        <div className="mt-4 pt-4 border-t">
            <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Выбранные фильтры:</span>
                <Button variant="ghost" size="sm" className="h-7 text-xs hover:bg-primary/5">
                    Очистить все
                </Button>
            </div>
            <div className="flex flex-wrap gap-2">
                <Badge className="gap-1 pl-3 pr-2 py-1.5">
                    Спорт
                    <X className="h-3 w-3 ml-1" />
                </Badge>
                <Badge className="gap-1 pl-3 pr-2 py-1.5">
                    Образование
                    <X className="h-3 w-3 ml-1" />
                </Badge>
                <Badge className="gap-1 pl-3 pr-2 py-1.5">
                    Здоровье
                    <X className="h-3 w-3 ml-1" />
                </Badge>
            </div>
        </div>
    )
}