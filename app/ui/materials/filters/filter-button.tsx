import { materialsWord } from "@/app/lib/utils"
import { cn } from "@/lib/utils"

interface FilterButtonProps {
    category: string
    count: number
    isSelected: boolean
    onClick: () => void
    variant?: 'desktop' | 'mobile'
}

export default function FilterButton({
    category,
    count,
    isSelected,
    onClick,
    variant = 'desktop'
}: FilterButtonProps) {

    const baseStyles = cn(
        "border rounded-lg p-3 cursor-pointer transition-all",
        "hover:border-primary hover:bg-primary/5",
        isSelected ? "border-primary bg-primary/5" : "border-border"
    )

    const renderDesktop = () => (
        <button
            className={cn(
                baseStyles,
                "flex flex-col items-center justify-center text-center min-h-[80px] w-full"
            )}
            onClick={onClick}>
            <div className="flex items-center gap-2 mb-1">
                <div className={cn(
                    "h-5 w-5 rounded border flex items-center justify-center flex-shrink-0",
                    isSelected ? "border-primary bg-primary" : "border-muted-foreground")}>
                    {isSelected && (
                        <div className="h-2 w-2 bg-white rounded-full" />
                    )}
                </div>
                <span className={cn(
                    "text-sm font-medium truncate max-w-full",
                    isSelected ? "text-primary" : "text-foreground")}>
                    {category}
                </span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
                {count} {' '} {materialsWord(count)}
            </div>
        </button>
    )

    const renderMobile = () => (
        <button
            className={cn(
                baseStyles,
                "relative flex items-center w-full px-4 py-3 min-h-[60px]"
            )}
            onClick={onClick}
        >
            <div className="flex items-center gap-3 w-full">
                <div className={cn(
                    "h-5 w-5 rounded border flex items-center justify-center flex-shrink-0",
                    isSelected ? "border-primary bg-primary" : "border-muted-foreground"
                )}>
                    {isSelected && (
                        <div className="h-2 w-2 bg-white rounded-full" />
                    )}
                </div>

                <div className="relative flex-1 min-w-0">
                    <span className={cn(
                        "text-sm font-medium block truncate pr-5",
                        isSelected ? "text-primary" : "text-foreground"
                    )}>
                        {category}
                    </span>

                    <div className={cn(
                        "absolute right-0 -top-1",
                        "flex items-center justify-center",
                        "h-5 w-5 rounded-full text-[10px] font-medium",
                        "border border-white dark:border-gray-900",
                        "z-10",
                        "shadow-xs",
                        "transition-all duration-200",
                        isSelected
                            ? "bg-primary text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    )}>
                        <span className="leading-none">{count}</span>
                    </div>
                </div>
            </div>
        </button>
    )

    return variant === 'desktop' ? renderDesktop() : renderMobile()
}