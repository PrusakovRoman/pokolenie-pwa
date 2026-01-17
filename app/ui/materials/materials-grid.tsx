import { MaterialCard } from "./card"

export function MaterialsGrid() {
    const materials = [
        {
            id: 1,
            title: "Современные подходы к образованию в цифровую эпоху",
            author: "Алексей Петров",
            date: "2024-03-15",
            imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
            type: "Образование",
            typeColor: "bg-blue-500"
        },
        {
            id: 2,
            title: "Психология здоровых отношений в семье",
            author: "Мария Сидорова",
            date: "2024-03-10",
            imageUrl: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w-800",
            type: "Семья",
            typeColor: "bg-emerald-500"
        },
        {
            id: 3,
            title: "Инновации в спортивной подготовке",
            author: "Иван Козлов",
            date: "2024-03-05",
            imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w-800",
            type: "Спорт",
            typeColor: "bg-orange-500"
        },
        {
            id: 4,
            title: "Технологии будущего в медицине",
            author: "Екатерина Новикова",
            date: "2024-02-28",
            imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w-800",
            type: "Здоровье",
            typeColor: "bg-purple-500"
        },
        {
            id: 5,
            title: "Финансовая грамотность для подростков",
            author: "Сергей Васильев",
            date: "2024-02-25",
            imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w-800",
            type: "Финансы",
            typeColor: "bg-amber-500"
        },
        {
            id: 6,
            title: "Цифровые инструменты для творчества",
            author: "Ольга Морозова",
            date: "2024-02-20",
            imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w-800",
            type: "Творчество",
            typeColor: "bg-pink-500"
        }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {materials.map((material) => (
                <MaterialCard
                    key={material.id}
                    title={material.title}
                    author={material.author}
                    date={material.date}
                    imageUrl={material.imageUrl}
                    type={material.type}
                    typeColor={material.typeColor}
                />
            ))}
        </div>
    )
}