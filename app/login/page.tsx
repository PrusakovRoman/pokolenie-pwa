import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function LoginPage() {
    return (
        <main className="min-h-screen flex items-center justify-center p-4 bg-linear-100 from-gray-200 to-gray-30">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-2xl">Вход в приложение</CardTitle>
                </CardHeader>

                <CardContent>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Электронная почта</Label>
                            <Input
                                id="email"
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
                                type="password"
                                required
                            />
                        </div>

                        <Button className="w-full" type="submit">
                            Войти
                        </Button>
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