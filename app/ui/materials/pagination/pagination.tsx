'use client'

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { generatePagination } from "@/app/lib/utils"

interface MaterialsPaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export function MaterialsPagination({
    currentPage,
    totalPages,
    onPageChange,
}: MaterialsPaginationProps) {
    if (totalPages <= 1) return null
    const pagination = generatePagination(totalPages, currentPage)

    return (
        <div className="flex items-center justify-center gap-4 mt-6 xs:mt-12 pt-8 border-t">
            <div className="flex items-center gap-1">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-xl border-gray-300 dark:border-gray-700 hover:border-primary hover:bg-primary/5"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="hidden sm:flex items-center gap-1 mx-2">
                    {pagination.map((pageNum, index) => (
                        pageNum === '...' ? (
                            <span
                                key={`ellipsis-${index}`}
                                className="mx-1 text-muted-foreground"
                            >
                                ...
                            </span>
                        ) : (
                            <Button
                                key={pageNum}
                                variant={pageNum === currentPage ? "default" : "outline"}
                                size="icon"
                                className={`h-10 w-10 rounded-xl ${pageNum === currentPage
                                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                    : "border-gray-300 dark:border-gray-700 hover:border-primary hover:bg-primary/5"
                                    }`}
                                onClick={() => onPageChange(pageNum as number)}
                            >
                                {pageNum}
                            </Button>
                        )
                    ))}
                </div>

                <div className="sm:hidden flex items-center gap-2 mx-2">
                    <span className="text-sm font-medium">
                        {currentPage}/{totalPages}
                    </span>
                </div>

                <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-xl border-gray-300 dark:border-gray-700 hover:border-primary hover:bg-primary/5"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}