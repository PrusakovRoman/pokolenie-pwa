'use server'

import { signIn, signOut } from "@/lib/auth"
import { AuthError } from "next-auth"
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

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


const DATA_PATH = path.join(process.cwd(), 'app/data/materials.json');

async function readData(): Promise<any> {
    try {
        const data = await fs.readFile(DATA_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading data:', error);
        return { materials: [] };
    }
}

async function writeData(data: any): Promise<void> {
    try {
        await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error writing data:', error);
    }
}

export async function deleteMaterial(id: string) {
    try {
        const data = await readData();
        const jsonData = data;

        const materialIndex = jsonData.materials.findIndex((m: any) => m.id === id);

        if (materialIndex === -1) {
            return {
                success: false,
                error: 'Материал не найден'
            };
        }

        const deletedMaterial = jsonData.materials[materialIndex];
        jsonData.materials.splice(materialIndex, 1);

        await writeData(jsonData);

        // 5. Ревалидируем все пути, где используются материалы
        revalidatePath('/dashboard/materials'); // Страница материалов
        revalidatePath('/material/[id]', 'page'); // Страницы отдельных материалов
        revalidatePath('/api/materials'); // API endpoint

        return {
            success: true,
            deleted: deletedMaterial
        };

    } catch (error) {
        console.error('Delete action error:', error);
        return {
            success: false,
            error: 'Ошибка при удалении материала'
        };
    }
}
