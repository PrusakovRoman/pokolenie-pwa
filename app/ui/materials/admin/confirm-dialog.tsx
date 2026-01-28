'use client';

import { Loader2 } from 'lucide-react';

interface MinimalConfirmDialogProps {
    isOpen: boolean;
    message?: string;
    materialTitle: string;
    onConfirm: () => Promise<void> | void;
    onCancel: () => void;
    isLoading?: boolean;
}

export default function ConfirmDialog({
    isOpen,
    message = 'Удалить материал?',
    materialTitle,
    onConfirm,
    onCancel,
    isLoading = false
}: MinimalConfirmDialogProps) {
    if (!isOpen) return null;

    const handleConfirm = async () => {
        await onConfirm();
    };

    return (
        <>
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-50"
                onClick={onCancel}
            />

            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-xs">
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
                    <div className="p-5 text-center">
                        <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                            {message}
                            <span className="block font-semibold text-gray-900 dark:text-white">("{materialTitle}")</span>
                        </p>

                        <div className="flex justify-center gap-3">
                            <button
                                onClick={onCancel}
                                disabled={isLoading}
                                className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors disabled:opacity-50"
                            >
                                Отмена
                            </button>
                            <button
                                onClick={handleConfirm}
                                disabled={isLoading}
                                className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    'Удалить'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}