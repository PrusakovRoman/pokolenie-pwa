import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SearchField() {
    return (<div className="relative group">
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
    </div>)
}