'use client';

import { useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import MaterialForm from '@/app/ui/materials/admin/material-form';

import { useSession } from 'next-auth/react';
import { CreateMaterialPageSkeleton } from '@/app/ui/skeletons';

export default function CreateMaterialPage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <CreateMaterialPageSkeleton />;
    }

    if (!session) {
        redirect('/login');
        return null;
    }

    if (session.user?.role !== 'Администратор') {
        redirect('/dashboard?error=unauthorized');
        return null;
    }

    const handleSubmit = async (formData: any) => {
        setIsSubmitting(true)

        try {
            const response = await fetch('/api/materials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Ошибка при сохранении материала')
            }

            const result = await response.json()

            if (result.success) {
                alert('Материал успешно создан!');
                router.push('/dashboard/materials');
            }

        } catch (error) {
            throw error;
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <div className="space-y-6">
            <h1 className="mb-6 mt-4 md:mt-2 text-xl md:text-2xl text-center font-semibold text-gray-800">Создание нового материала</h1>
            <MaterialForm
                mode="create"
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            />
        </div>
    );
}