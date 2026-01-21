import { useDebouncedCallback } from "use-debounce"
import { useState, useEffect } from "react"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface searchFieldProps {
    searchQuery: string
    setSearchQuery: (query: string) => void
}

export default function SearchField({ searchQuery, setSearchQuery }: searchFieldProps) {
    const [inputValue, setInputValue] = useState(searchQuery)

    const debouncedSetSearchQuery = useDebouncedCallback((value: string) => {
        setSearchQuery(value)
    }, 300)

    useEffect(() => {
        setSearchQuery(searchQuery)
    }, [searchQuery])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setInputValue(value)
        debouncedSetSearchQuery(value)
    }

    const handleClear = () => {
        setInputValue('')
        setSearchQuery('')
        debouncedSetSearchQuery.cancel()
    }

    return (
        <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-hover:text-primary group-focus-within:text-primary transition-colors duration-200" />
            <Input
                value={inputValue}
                onChange={handleChange}
                placeholder="Найти материал..."
                className="pl-12 pr-12 h-14 text-lg rounded-xl border-2 transition-all duration-200 focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            {searchQuery && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 hover:bg-primary/5"
                    type='button'
                    onClick={handleClear}
                >
                    <X className="h-5 w-5" />
                </Button>
            )
            }

        </div >
    )
}