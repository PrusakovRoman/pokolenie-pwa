import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'

export default function MaterialNotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center max-w-md">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <h2 className="text-2xl font-semibold mb-4">Материал не найден</h2>
                <p className="text-muted-foreground mb-8">
                    Извините, запрашиваемый материал не существует или был удален.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild>
                        <Link href="/dashboard/materials" className="flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            К материалам
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}