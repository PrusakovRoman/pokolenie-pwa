import SectionHeader from "@/app/ui/dashboard/section-header"

export default function Page() {
    return (
        <div className="min-h-screen bg-background p-4 md:p-6">
            <div className="container mx-auto">
                <SectionHeader />
                <div className="bg-primary/10 rounded-lg p-4 md:p-8 shadow-md">
                    <p className="text-lg font-medium">
                        Здесь скоро появятся ваша персональная статистика,
                        рекомендации и важные обновления проекта.
                    </p>
                    <p className="text-md mt-2 text-gray-700">
                        А пока все материалы доступны во вкладке <strong className="text-primary">«Материалы»</strong>
                    </p>
                </div>
            </div>
        </div>
    )
}