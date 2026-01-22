'use server'

import { signIn } from "@/lib/auth"
import { AuthError } from "next-auth"
import { redirect } from 'next/navigation';
import { signOut } from "@/lib/auth";

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

export async function fetchMaterial(id: string) {
    try {
        const isVercel = !!process.env.VERCEL;
        let baseUrl = 'http://localhost:3000';

        if (isVercel) {
            const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ||
                process.env.VERCEL_URL;
            baseUrl = `https://${vercelUrl}`;
        }

        const apiUrl = `${baseUrl}/api/material/${id}`;

        const response = await fetch(apiUrl, {
            next: { revalidate: 3600 }
        })

        if (!response.ok) {
            if (response.status === 404) {
                return null
            }
            throw new Error('Ошибка загрузки материала')
        }

        return await response.json()
    } catch (error) {
        console.error('Error fetching material:', error)
        return null
    }
}

export async function logout() {
    await signOut({ redirect: false })
    redirect('/')
}