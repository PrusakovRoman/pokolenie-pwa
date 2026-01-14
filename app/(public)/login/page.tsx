'use client'
// сделать обработку ошибки при неправильном вводе данных
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"

import { useActionState } from "react"
import { authenticate } from "@/app/lib/actions"
import { useSearchParams } from "next/navigation"

export default function LoginPage() {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/profile'
    const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined)

    return (
        <main className="min-h-screen flex items-center justify-center p-4 bg-linear-100 from-gray-200 to-gray-30">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-2xl">Вход в приложение</CardTitle>
                </CardHeader>

                <CardContent>
                    <form
                        action={formAction}
                        className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Электронная почта</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="password">Пароль</Label>
                                <Button
                                    variant="link"
                                    className="h-auto p-0 text-xs"
                                    type="button"
                                >
                                    Забыли пароль?
                                </Button>
                            </div>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                minLength={6}
                            />
                        </div>
                        <input type="hidden" name="customRedirect" value={callbackUrl} />
                        <Button className="w-full" type="submit" aria-disabled={isPending}>
                            Войти
                        </Button>
                        <div
                            className="flex h-8 items-end space-x-1"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            {errorMessage && (
                                <p className="text-sm text-red-500">{errorMessage}</p>
                            )}
                        </div>
                    </form>
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