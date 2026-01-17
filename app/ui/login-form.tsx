'use client'

import { useActionState } from "react"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

import { authenticate } from "@/app/lib/actions"

export default function LoginForm() {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
    const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined)

    return (
        <>
            <div
                className="flex h-8 items-end space-x-1 pb-3"
                aria-live="polite"
                aria-atomic="true"
            >
                {errorMessage ? (
                    <>
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                        <p className="text-sm text-red-500">{errorMessage}</p></>
                ) : null}
            </div>
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
                            onClick={() => alert('Логика восстановления пароль скоро будет реализована! Для восстановления пароля напишите на почту lalala@ro.ru')}
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
            </form>
        </>)
}