'use server'

import { auth } from "@/lib/auth"
import Link from "next/link"

import Header from "@/app/ui/header"
import Footer from "@/app/ui/footer"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { PWAInstall } from "@/app/features/installation/pwa-install"

export default async function Home() {
  const session = await auth()

  return (
    <>
      <Header />

      <main>
        <div className="container mx-auto p-6 md:py-16">
          <div className="flex flex-col items-center gap-10">
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

              {session?.user ?
                (
                  <div className="lg:w-1/2 w-full max-w-md">
                    <Card className="border shadow-lg">
                      <CardContent>
                        <div className="space-y-6">
                          <Button className="w-full h-12" asChild>
                            <Link href="/dashboard">Перейти в профиль</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
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
            <PWAInstall />
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}