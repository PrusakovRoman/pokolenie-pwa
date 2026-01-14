'use server'

import { signIn } from "@/lib/auth"
import { AuthError } from "next-auth"

import { redirect } from 'next/navigation';

export async function authenticate(prevState: string | undefined, formData: FormData) {
    // try {
    console.log('📨 FormData keys:', Array.from(formData.keys()))

    const result = await signIn('credentials',
        {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            // redirectTo: formData.get('redirectTo') as string || '/profile',
            redirect: false
        }
    )

    console.log('signIn result:', result)
    const customRedirect = formData.get('customRedirect') as string || '/profile'
    redirect(customRedirect)
    // } catch (error) {
    // if (error instanceof AuthError) {
    //     switch (error.type) {
    //         case 'CredentialsSignin': return 'Неверный логин или пароль'
    //         default: return 'Что-то пошло не так'
    //     }
    // }
    // throw error
    // }
}