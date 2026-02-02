'use server'

import { auth, signIn, signOut } from "@/lib/auth"
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
            next: {
                tags: [`material-${id}`],
                revalidate: 3600
            }
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

export async function getCurrentUser() {
    const session = await auth();
    return session?.user;
}

export async function checkIsAdmin(): Promise<boolean> {
    const user = await getCurrentUser();
    return user?.role === 'Администратор'
}

export async function getUserEmail(): Promise<string | null> {
    const user = await getCurrentUser();
    return user?.email ?? null;
}

export async function requireAuth() {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error('Unauthorized');
    }
    return user;
}