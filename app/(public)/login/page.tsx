import Link from "next/link"
import { Suspense } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import LoginForm from "@/app/ui/login-form"

export default function LoginPage() {
    return (
        <main className="min-h-screen flex items-center justify-center p-4 bg-linear-100 from-gray-200 to-gray-30">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-2xl">Вход в приложение</CardTitle>
                </CardHeader>

                <CardContent>
                    <Suspense>
                        <LoginForm />
                    </Suspense>
                </CardContent>

                <CardFooter className="flex-col space-y-4 border-t pt-6">
                    <Button variant="outline" className="w-full" asChild>
                        <Link href="/">← На главную страницу</Link>
                    </Button>
                </CardFooter>
            </Card>
        </main>
    )
}