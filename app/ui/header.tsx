import { auth } from "@/lib/auth"

import Logo from "@/app/ui/pokolenie-logo"
import AuthSection from "@/app/ui/auth-header-section"

export default async function Header() {
    const session = await auth()
    return (
        <header className="block">
            <div className="container mx-auto p-4 xs:p-6">
                <div className="bg-white mx-auto flex justify-between align-center px-4 py-4 sm:px-8 sm:py-6 rounded-4xl shadow-md gap-8">
                    <div className="flex items-center">
                        <Logo />
                    </div>
                    <AuthSection session={session} />
                </div>
            </div>
        </header>
    )
}