export default function FilterButton({ type, qty, isSelected }: { type: { id: string, label: string }, qty: string, isSelected: boolean }) {
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
                    {qty} материалов
                </div>
            )}
        </button>
    )
}