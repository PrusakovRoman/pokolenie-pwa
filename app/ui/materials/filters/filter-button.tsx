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
                "flex items-center justify-between gap-1 w-full px-4 py-3"
            )}
            onClick={onClick}>
            <div className="flex items-center gap-3">
                <div className={cn(
                    "h-5 w-5 rounded border flex items-center justify-center flex-shrink-0",
                    isSelected ? "border-primary bg-primary" : "border-muted-foreground"
                )}>
                    {isSelected && (
                        <div className="h-2 w-2 bg-white rounded-full" />
                    )}
                </div>

                <span className={cn(
                    "text-sm font-medium",
                    isSelected ? "text-primary" : "text-foreground"
                )}>
                    {category}
                </span>
            </div>

            <div className={cn(
                "flex items-center justify-center h-7 w-7 rounded-full text-xs font-medium",
                isSelected
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-primary")}>
                {count}
            </div>
        </button>
    )

    return variant === 'desktop' ? renderDesktop() : renderMobile()
}