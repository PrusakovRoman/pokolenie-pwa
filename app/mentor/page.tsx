import { Heart } from "lucide-react"

import Header from "@/app/ui/header"
import Footer from "@/app/ui/footer"

export default function MentorPage() {
    return (
        <>
            <Header />
            <main className="w-full text-center">
                <p className="flex gap-2 items-centertext-lg md:text-xl justify-center">На этой странице будет информация о наставнике... <Heart className="text-primary fill-primary" /></p>
            </main>
            <Footer />
        </>

    )
}