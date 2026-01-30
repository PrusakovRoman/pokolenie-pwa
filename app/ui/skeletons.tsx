const shimmer =
    'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function MaterialCardSkeleton() {
    return (
        <div className={`${shimmer} relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm h-full flex flex-col`}>
            <div className="absolute top-4 right-4 z-10">
                <div className="h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-800"></div>
            </div>

            <div className="relative h-48 overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-800">
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                <div className="absolute top-4 left-4">
                    <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-sm mb-3 h-[40px]">
                    <div className="flex items-center gap-1.5">
                        <div className="h-4 w-4 rounded bg-gray-200 dark:bg-gray-700"></div>
                        <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="h-4 w-4 rounded bg-gray-200 dark:bg-gray-700"></div>
                        <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                </div>

                <div className="mb-3 min-h-[4rem] space-y-2">
                    <div className="h-5 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
                </div>

                <div className="mt-auto space-y-2">
                    <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-4 w-4/6 rounded bg-gray-200 dark:bg-gray-700"></div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800"></div>
        </div>
    );
}

export function MaterialsGridSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2 xs:p-6">
            <MaterialCardSkeleton />
            <MaterialCardSkeleton />
            <MaterialCardSkeleton />
            <MaterialCardSkeleton />
            <MaterialCardSkeleton />
            <MaterialCardSkeleton />
        </div>
    );
}

export function FilterButtonSkeleton({ variant = 'desktop' }: { variant?: 'desktop' | 'mobile' }) {
    if (variant === 'desktop') {
        return (
            <div className={`${shimmer} border border-gray-200 dark:border-gray-800 rounded-lg p-3 min-h-[80px] w-full bg-white dark:bg-gray-900`}>
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-5 w-5 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                        <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                    </div>
                    <div className="h-3 w-12 rounded bg-gray-200 dark:bg-gray-700 animate-pulse mt-1" />
                </div>
            </div>
        );
    }

    return (
        <div className={`${shimmer} border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-3 w-full bg-white dark:bg-gray-900`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                    <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                </div>
                <div className="h-7 w-7 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
            </div>
        </div>
    );
}

export function FiltersGridSkeleton() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <FilterButtonSkeleton variant="desktop" />
            <FilterButtonSkeleton variant="desktop" />
            <FilterButtonSkeleton variant="desktop" />
            <FilterButtonSkeleton variant="desktop" />
            <FilterButtonSkeleton variant="desktop" />
            <FilterButtonSkeleton variant="desktop" />
        </div>
    );
}

export function FiltersMobileSkeleton() {
    return (
        <div className="space-y-2">
            <FilterButtonSkeleton variant="mobile" />
            <FilterButtonSkeleton variant="mobile" />
            <FilterButtonSkeleton variant="mobile" />
            <FilterButtonSkeleton variant="mobile" />
            <FilterButtonSkeleton variant="mobile" />
            <FilterButtonSkeleton variant="mobile" />
        </div>
    );
}


export function MaterialPageSkeleton() {
    return (
        <>
            {/* Шапка */}
            <div className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 py-4">
                    <div className="h-8 w-40 rounded bg-gray-200 dark:bg-gray-800" />
                </div>
            </div>

            <main className="container mx-auto p-4 xs:py-8 md:px-6 max-w-4xl">
                {/* Кнопка назад */}
                <div className="mb-8">
                    <div className={`${shimmer} relative h-10 w-32 rounded bg-gray-100 dark:bg-gray-800`} />
                </div>

                <div className="mb-10">
                    {/* Категория и дата */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`${shimmer} relative h-7 w-24 rounded-full bg-gray-200 dark:bg-gray-700`} />
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded bg-gray-200 dark:bg-gray-700" />
                            <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700" />
                        </div>
                    </div>

                    {/* Заголовок */}
                    <div className="space-y-3 mb-8">
                        <div className="h-10 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                        <div className="h-10 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
                    </div>

                    {/* Автор */}
                    <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded bg-gray-200 dark:bg-gray-700" />
                        <div className="h-5 w-32 rounded bg-gray-200 dark:bg-gray-700" />
                    </div>
                </div>

                {/* Введение */}
                <div className="space-y-3 mb-8">
                    <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-4 w-4/6 rounded bg-gray-200 dark:bg-gray-700" />
                </div>

                {/* Медиа-контент */}
                <MediaContentSkeleton />

                <div className="h-px bg-gray-200 dark:bg-gray-800 mb-8 hidden md:block" />

                {/* Основной контент */}
                <div className="space-y-4 mb-8">
                    <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
                </div>

                {/* Вывод */}
                <div className={`${shimmer} relative bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 mb-8`}>
                    <div className="h-8 w-32 rounded bg-gray-200 dark:bg-gray-700 mb-6" />
                    <div className="space-y-3">
                        <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-600" />
                        <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-600" />
                        <div className="h-4 w-4/6 rounded bg-gray-200 dark:bg-gray-600" />
                    </div>
                </div>

                {/* Кнопка внизу */}
                <div className="mt-12 pt-8 border-t">
                    <div className="flex justify-center">
                        <div className={`${shimmer} relative h-10 w-48 rounded bg-gray-200 dark:bg-gray-700`} />
                    </div>
                </div>
            </main>

            {/* Футер */}
            <div className="border-t bg-white dark:bg-gray-900 mt-12">
                <div className="container mx-auto px-4 py-8">
                    <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800" />
                </div>
            </div>
        </>
    );
}

export function MediaContentSkeleton() {
    return (
        <div className={`${shimmer} relative mb-8 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800`}>
            <div className="aspect-video relative bg-gray-200 dark:bg-gray-800">
                <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />

                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    {/* Заголовок в медиа */}
                    <div className="space-y-3 mb-6 w-full max-w-2xl">
                        <div className="h-6 w-3/4 rounded bg-gray-300 dark:bg-gray-600 mx-auto" />
                        <div className="h-6 w-2/3 rounded bg-gray-300 dark:bg-gray-600 mx-auto" />
                    </div>

                    {/* Кнопка */}
                    <div className="h-12 w-48 rounded-full bg-gray-300 dark:bg-gray-600" />
                </div>
            </div>
        </div>
    );
}

export function MaterialContentSkeleton() {
    return (
        <div className="container mx-auto p-4 xs:py-8 md:px-6 max-w-4xl">
            <div className="mb-8">
                <div className={`${shimmer} relative h-10 w-32 rounded bg-gray-100 dark:bg-gray-800`} />
            </div>

            <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className={`${shimmer} relative h-7 w-24 rounded-full bg-gray-200 dark:bg-gray-700`} />
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded bg-gray-200 dark:bg-gray-700" />
                        <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700" />
                    </div>
                </div>

                <div className="space-y-3 mb-8">
                    <div className="h-10 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-10 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
                </div>

                <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-5 w-32 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
            </div>

            <div className="space-y-3 mb-8">
                <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-4/6 rounded bg-gray-200 dark:bg-gray-700" />
            </div>

            <MediaContentSkeleton />

            <div className="h-px bg-gray-200 dark:bg-gray-800 mb-8 hidden md:block" />

            <div className="space-y-4 mb-8">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className={`h-4 rounded bg-gray-200 dark:bg-gray-700 ${i % 2 === 0 ? 'w-full' : 'w-5/6'}`}
                    />
                ))}
            </div>

            <div className={`${shimmer} relative bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 mb-8`}>
                <div className="h-8 w-32 rounded bg-gray-200 dark:bg-gray-700 mb-6" />
                <div className="space-y-3">
                    <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-600" />
                    <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-600" />
                    <div className="h-4 w-4/6 rounded bg-gray-200 dark:bg-gray-600" />
                </div>
            </div>

            <div className="mt-12 pt-8 border-t">
                <div className="flex justify-center">
                    <div className={`${shimmer} relative h-10 w-48 rounded bg-gray-200 dark:bg-gray-700`} />
                </div>
            </div>
        </div>
    );
}

