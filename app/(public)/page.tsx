// 'use client'
'use server'
import { Logo } from "@/app/ui/pokolenie-logo"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

redirect

export default async function Home() {
  const session = await auth()

  return (
    <div className="min-h-screen flex flex-col justify-between bg-linear-160 from-gray-200 to-gray-30">
      <header className="hidden md:block">
        <div className="container mx-auto p-7">
          <div className="bg-white mx-auto flex justify-between align-center px-8 py-6 rounded-4xl shadow-md">
            <div className="flex items-center gap-3">
              <Logo />
            </div>
            <Button asChild>
              {session?.user ? <Link href="/profile">Перейти в профиль</Link> : <Link href="/login">Войти</Link>}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-6">
              <div className="hidden sm:inline-flex items-center gap-3 bg-primary/10 text-primary px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-base font-medium">Закрытый портал</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Добро пожаловать в
                <span className="block text-primary mt-2">сообщество «Поколение»</span>
              </h1>

              <p className="text-xl text-gray-600 max-w-2xl">
                Это закрытая платформа для участников проекта. Здесь вы найдёте материалы для развития, сможете отслеживать прогресс и общаться с наставниками.
              </p>
            </div>

          </div>

          {/* Правая часть - карточка входа */}
          {session?.user ?
            (<div className="lg:w-1/2 w-full max-w-md">
              <Card className="border shadow-lg">
                <CardContent>
                  <div className="space-y-6">
                    <Button className="w-full h-12" asChild>
                      <Link href="/profile">Перейти в профиль</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>)
            :
            (<div className="lg:w-1/2 w-full max-w-md">
              <Card className="border shadow-lg">
                <CardContent className="pt-4">
                  <div className="space-y-6">
                    <div className="text-center space-y-2">
                      <h3 className="font-semibold">Уже являетесь участником?</h3>
                    </div>

                    <Button className="w-full h-12" asChild>
                      <Link href="/login">Войти</Link>
                    </Button>
                  </div>
                </CardContent>

                <Separator />

                <CardFooter className="pt-4">
                  <div className="text-center w-full space-y-3">
                    <p className="text-sm text-gray-600">
                      Хотите присоединиться к сообществу?
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="https://pokolenie.info/участникам/" target="_blank">
                        Узнать об отборе на сайте
                      </a>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>)}
        </div>
      </div>

      <footer className="hidden md:block">
        <div className="container mx-auto">
          <div className="flex justify-between items-center text-sm text-gray-500 p-8">
            <div>© 2026 Проект «Поколение». Все права защищены.</div>
            <div className="flex gap-6">
              {/* <a href="" className="hover:text-gray-700" onClick={(e) => {
                e.preventDefault()
                alert("Здесь будет ссылка на контакты")
              }}>Контакты</a>
              <a href="" className="hover:text-gray-700" onClick={(e) => {
                e.preventDefault()
                alert("Здесь будет ссылка на службу заботы")
              }}>Служба заботы</a>
              <a href="" className="hover:text-gray-700" onClick={(e) => {
                e.preventDefault()
                alert("Здесь будет ссылка на политику конфиденциальности")
              }}>Политика конфиденциальности</a> */}
            </div>
          </div>
        </div>
      </footer>

      {/* Мобильный футер */}
      {/* <footer className="md:hidden py-6">
        <div className="container">
          <div className="text-center space-y-4">
            <div className="text-sm text-gray-500">
              © 2026 Проект «Поколение»
            </div>
            <div className="flex justify-center gap-6 text-sm">
              <a href="" className="text-gray-500 hover:text-gray-700" onClick={(e) => {
                e.preventDefault()
                alert("Здесь будет ссылка на контакты")
              }}>Контакты</a>
              <a href="" className="text-gray-500 hover:text-gray-700" onClick={(e) => {
                e.preventDefault()
                alert("Здесь будет ссылка на службу заботы")
              }}>Служба заботы</a>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  )
}