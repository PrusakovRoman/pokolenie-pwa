// components/materials/MaterialsSection.tsx
'use client'

import { useState } from "react"
import { Search, Filter, Calendar, User, BookOpen, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { MaterialsGrid } from "@/app/ui/materials/materials-grid"
import { MaterialsFiltersAlt } from "@/app/ui/materials/filters"
import { MaterialsPagination, MaterialsPaginationMinimal, SimplePagination } from "@/app/ui/materials/pagination"


export default function Materials() {
    return (
        <div className="min-h-screen bg-background p-4 md:p-6">
            <div className="container mx-auto">
                {/* Заголовок */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Материалы</h1>
                </div>

                {/* Панель поиска и фильтров */}
                <MaterialsFiltersAlt />

                <MaterialsGrid />

                <MaterialsPagination />
                {/* эта вроде самая адекватная */}
                {/* <MaterialsPaginationMinimal /> */}
                {/* <SimplePagination /> */}
            </div>
        </div>
    )
}