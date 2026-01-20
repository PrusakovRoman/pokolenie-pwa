import FiltersGrid from "@/app/ui/materials/filters/mobile/filters-grid";

import { Filter, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function MobileFilters() {
    return (
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

                        <FiltersGrid />

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
    )
}