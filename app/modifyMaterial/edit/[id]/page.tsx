'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import MaterialForm from '@/app/ui/materials/admin/material-form';
import LinkToMaterials from '@/app/ui/link-to-materials';
import ConfirmDialog from '@/app/ui/materials/admin/confirm-dialog';
import { MaterialPageSkeleton } from '@/app/ui/skeletons';

export default function EditMaterialPage() {
    const router = useRouter();
    const params = useParams();
    const materialId = params.id as string;

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [materialData, setMaterialData] = useState<any>(null);

    useEffect(() => {
        const fetchMaterial = async () => {
            try {
                const response = await fetch(`/api/materials?id=${materialId}`);
                if (!response.ok) throw new Error('Материал не найден');

                const data = await response.json();
                const material = data.data?.find((m: any) => m.id === materialId) || data;
                setMaterialData(material);
            } catch (error) {
                console.error('Error fetching material:', error);
                router.push('/dashboard/materials');
            } finally {
                setIsLoading(false);
            }
        };

        if (materialId) {
            fetchMaterial();
        }
    }, [materialId, router]);

    const handleSubmit = async (formData: any) => {
        setIsSubmitting(true);
        try {
            const response = await fetch(`/api/materials?id=${materialId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Ошибка при обновлении материала');
            }

            const result = await response.json();

            if (result.success) {
                alert('Материал успешно обновлен!');
                router.push('/dashboard/materials');
            }
        } catch (error) {
            throw error;
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const response = await fetch(`/api/materials?id=${materialId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Ошибка при удалении');
            }

            alert('Материал успешно удален!');
            router.push('/dashboard/materials');
        } catch (error) {
            console.error('Delete error:', error);
        } finally {
            setIsDeleting(false);
            setShowDeleteDialog(false);
        }
    };

    if (isLoading) return <MaterialPageSkeleton />

    if (!materialData) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-500">Материал не найден</div>
                <LinkToMaterials />
            </div>
        );
    }

    return (
        <>
            <h1 className="mb-6 mt-4 md:mt-2 text-xl md:text-2xl text-center font-semibold text-gray-800">Редактирование текущего материала</h1>
            <MaterialForm
                mode="edit"
                initialData={materialData}
                onSubmit={handleSubmit}
                onDelete={() => setShowDeleteDialog(true)}
                isSubmitting={isSubmitting}
                deleteLoading={isDeleting}
            />

            <ConfirmDialog
                isOpen={showDeleteDialog}
                materialTitle={materialData.title}
                message="Вы уверены, что хотите удалить этот материал?"
                onConfirm={handleDelete}
                onCancel={() => setShowDeleteDialog(false)}
                isLoading={isDeleting}
            />
        </>
    );
}