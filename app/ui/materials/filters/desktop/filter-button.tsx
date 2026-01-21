import { materialsWord } from "@/app/lib/utils"

interface FilterButtonProps {
    category: string
    count: number
    isSelected: boolean
    onClick: () => void
}

export default function FilterButton({ category, count, isSelected, onClick }: FilterButtonProps) {
    return (
        <button
            className={`
        relative border rounded-lg p-3 cursor-pointer transition-all
        hover:border-primary hover:bg-primary/5
        ${isSelected ? "border-primary bg-primary/5" : "border-border"}
        flex flex-col items-center justify-center text-center min-h-[80px]
      `} onClick={onClick}
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
                    {category}
                </span>
            </div>
            {category !== "Все" && (
                <div className="text-xs text-muted-foreground mt-1">

                    {count} {' '} {materialsWord(count)}
                </div>
            )}
        </button>
    )
}