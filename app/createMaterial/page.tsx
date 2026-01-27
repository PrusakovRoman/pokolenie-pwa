import Header from "@/app/ui/header"
import Footer from "@/app/ui/footer"

import CreateMaterialForm from "@/app/ui/createMaterial/form";
import LinkToMaterials from "@/app/ui/createMaterial/link-to-materials";

export default function CreateMaterialPage() {
    return (
        <>
            <Header />

            <main className="bg-background">
                <div className="container mx-auto p-4 xs:p-6">
                    <div className="bg-white rounded-2xl shadow-md overflow-hidden p-6">
                        <LinkToMaterials />
                        <h1 className="mb-6 mt-4 md:mt-2 text-xl md:text-2xl text-center font-semibold text-gray-800">Создание нового материала</h1>
                        <CreateMaterialForm />
                    </div>
                </div>
            </main >

            <Footer />
        </>
    )
}