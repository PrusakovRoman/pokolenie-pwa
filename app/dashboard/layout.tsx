import Header from "@/app/ui/header"
import Footer from "@/app/ui/footer"
import NavLinks from "@/app/ui/dashboard/nav-links"

import { Separator } from "@/components/ui/separator"

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
                            <NavLinks />
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