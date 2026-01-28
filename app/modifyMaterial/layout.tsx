import Header from "@/app/ui/header"
import Footer from "@/app/ui/footer"
import LinkToMaterials from "@/app/ui/link-to-materials"

export default function modifyMaterialLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />

            <main className="bg-background">
                <div className="container mx-auto p-4 xs:p-6">
                    <div className="bg-white rounded-2xl shadow-md overflow-hidden p-6">
                        <LinkToMaterials />
                        {children}
                    </div>
                </div>
            </main >

            <Footer />
        </>
    )
}