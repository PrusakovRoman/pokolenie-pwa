import { Heart } from "lucide-react"

import Header from "@/app/ui/header"
import Footer from "@/app/ui/footer"

export default function MentorPage() {
    return (
        <>
            <Header />
            <main className="w-full text-center">
                <p className="text-lg md:text-xl">На этой странице будет информация о наставнике... <Heart className="text-primary fill-primary inline ml-2 mb-1" /></p>
            </main>
            <Footer />
        </>

    )
}