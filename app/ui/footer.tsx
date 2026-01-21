'use client'

export default function Footer() {
    const links = [
        { text: "Контакты", message: "Здесь будет ссылка на контакты" },
        { text: "Служба заботы", message: "Здесь будет ссылка на службу заботы" },
    ]

    const handleClick = (message: string) => (e: React.MouseEvent) => {
        e.preventDefault()
        alert(message)
    }

    return (
        <footer>
            <div className="container mx-auto p-4 p-xs-6 md:py-8">
                <div className="md:flex justify-between items-center text-center text-sm text-gray-500">
                    <div className="mb-4 md:mb-0">© 2026 Проект «Поколение»</div>
                    <div className="flex gap-6 justify-center md:justify-start">
                        {links.map((link) => (
                            <a
                                key={link.text}
                                href="#"
                                className="hover:text-gray-700"
                                onClick={handleClick(link.message)}
                            >
                                {link.text}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}