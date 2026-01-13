import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
    return (
        <main className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-2xl">Вход в приложение</CardTitle>
                    <CardDescription>
                        Используйте учётные данные участника проекта
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form className="space-y-4">
                        {/* Поле email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Электронная почта</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="participant@example.com"
                                required
                            />
                        </div>

                        {/* Поле пароля */}
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
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {/* Кнопка входа */}
                        <Button className="w-full" type="submit">
                            Войти
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex-col space-y-4 border-t pt-6">
                    <p className="text-sm text-muted-foreground text-center">
                        Приложение доступно только участникам проекта
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                        <a href="/">← На главную страницу</a>
                    </Button>
                </CardFooter>
            </Card>
        </main>
    )
}