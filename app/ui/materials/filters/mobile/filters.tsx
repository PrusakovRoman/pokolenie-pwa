import FiltersGrid from "@/app/ui/materials/filters/mobile/filters-grid";
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CategoryStat } from "@/lib/types/materials";

interface MobileFiltersProps {
    selectedCategories: string[]
    categoryStats: CategoryStat[]
    toggleCategory: (category: string) => void
    resetFilters: () => void
}

export default function MobileFilters({ selectedCategories, categoryStats, toggleCategory, resetFilters }: MobileFiltersProps) {
    const activeFiltersCount = selectedCategories.filter(cat => cat !== 'Все').length

    return (
        <div className="lg:hidden">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4" />
                            <span>Фильтры</span>
                            {activeFiltersCount > 0 && (
                                <Badge variant="secondary">
                                    {activeFiltersCount}
                                </Badge>
                            )}
                        </div>
                        <span className="text-sm text-muted-foreground truncate max-w-[120px]">
                            {activeFiltersCount > 0
                                ? selectedCategories.filter(c => c !== 'Все').join(', ')
                                : 'Все'
                            }
                        </span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-screen max-w-[calc(100vw-2rem)] mx-4 p-0"
                    align="start"
                >
                    <div className="max-h-[70vh] overflow-y-auto flex flex-col">
                        <div className="sticky top-0 z-10 flex-shrink-0 flex items-center justify-between border-b bg-background px-4 py-3">
                            <div className="flex items-center gap-2">
                                <Filter className="h-4 w-4" />
                                <span className="font-medium">Фильтры</span>
                                {activeFiltersCount > 0 && (
                                    <Badge variant="secondary" className="ml-2">
                                        {activeFiltersCount}
                                    </Badge>
                                )}
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
                                }}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="flex-grow p-4 overflow-y-auto">
                            <FiltersGrid
                                selectedCategories={selectedCategories}
                                categoryStats={categoryStats}
                                toggleCategory={toggleCategory}
                            />
                        </div>

                        <div className="sticky bottom-0 flex-shrink-0 border-t bg-background p-4">
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => {
                                    resetFilters();
                                    setTimeout(() => {
                                        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
                                    }, 100);
                                }}
                                disabled={activeFiltersCount === 0}
                            >
                                Сбросить все фильтры
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}