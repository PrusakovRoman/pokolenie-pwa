'use server'

import { signIn } from "@/lib/auth"
import { AuthError } from "next-auth"
import { redirect } from 'next/navigation';

export async function authenticate(prevState: string | undefined, formData: FormData) {
    try {
        await signIn('credentials',
            {
                email: formData.get('email') as string,
                password: formData.get('password') as string,
                redirect: false
            }
        )

        const customRedirect = formData.get('customRedirect') as string || '/dashboard'
        redirect(customRedirect)
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin': return 'Неверный логин или пароль'
                default: return 'Что-то пошло не так'
            }
        }
        throw error
    }
}