import Link from "next/link"
import Header from "@/app/ui/header"
import Footer from "@/app/ui/footer"
import SideNav from "@/app/ui/dashboard/sidenav"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Home, BookOpen } from "lucide-react"


{/* <div className="flex flex-row justify-between items-center bg-white px-8 py-6 rounded-4xl shadow-md">
                        
                        <div className="border border-2 border-green-500">
                            <Link href="/dashboard" className="block">dashboard</Link>
                            <Link href="/dashboard/materials">materials</Link>
                        </div>
                        <div>{children}</div>
                    </div> */}


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header />
            <main>
                <div className="container mx-auto p-6">

                    <div className="border rounded-lg bg-white shadow-md ">
                        <div className="flex gap-2 p-4">
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/dashboard" className="flex items-center gap-2">
                                    <Home className="h-4 w-4" />
                                    <span className="hidden md:block">Главная</span>
                                </Link>
                            </Button>
                            {/* <Button variant="outline" size="sm" asChild>
                                <Link href="/dashboard/materials" className="flex items-center gap-2">
                                    <BookOpen className="h-4 w-4" />
                                    <span className="hidden md:block">Материалы</span>
                                </Link>
                            </Button> */}
                            <Button className="flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary border-primary shadow-sm" variant="outline" size="sm" asChild>
                                <Link href="/dashboard/materials" className="flex items-center gap-2">
                                    <BookOpen className="h-4 w-4" />
                                    <span className="hidden md:block">Материалы</span>
                                </Link>
                            </Button>
                        </div>

                        <Separator />

                        <div>
                            {children}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}