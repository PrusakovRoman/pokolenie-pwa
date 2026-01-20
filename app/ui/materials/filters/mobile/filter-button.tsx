export default function FilterButton({ type }: { type: { id: string, label: string } }) {
    return (
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
    )
}