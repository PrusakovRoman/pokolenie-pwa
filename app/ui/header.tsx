import { auth } from "@/lib/auth"

import Logo from "@/app/ui/pokolenie-logo"
import AuthSection from "@/app/ui/auth-header-section"

export default async function Header() {
    const session = await auth()

    return (
        <header className="block">
            <div className="container mx-auto p-6">
                <div className="bg-white mx-auto flex justify-between align-center px-8 py-6 rounded-4xl shadow-md">
                    <div className="flex items-center gap-3">
                        <Logo />
                    </div>
                    <AuthSection session={session} />
                </div>
            </div>
        </header>
    )
}