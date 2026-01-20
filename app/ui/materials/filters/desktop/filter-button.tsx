interface Category {
    id: string
    label: string
}

interface FilterButton {
    category: Category
    selectedCategories: string[]
    toggleCategory: (categoryId: string) => void
}

export default function FilterButton({ category, selectedCategories, toggleCategory }: FilterButton) {
    const isSelected = selectedCategories.includes(category.id)
    return (
        <button
            className={`
        relative border rounded-lg p-3 cursor-pointer transition-all
        hover:border-primary hover:bg-primary/5
        ${isSelected ? "border-primary bg-primary/5" : "border-border"}
        flex flex-col items-center justify-center text-center min-h-[80px]
      `} onClick={() => toggleCategory(category.id)}
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
                    {category.label}
                </span>
            </div>
            {category.id !== "all" && (
                <div className="text-xs text-muted-foreground mt-1">
                    {/* {} материалов */}
                </div>
            )}
        </button>
    )
}