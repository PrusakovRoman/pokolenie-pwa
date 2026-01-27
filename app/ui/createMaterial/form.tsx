'use client';

import { cn } from '@/lib/utils';
import { useState, FormEvent } from 'react';
import LinkToMaterials from './link-to-materials';

const CATEGORIES = [
    { name: 'Soft-skills', color: 'bg-pink-500' },
    { name: 'Бизнес', color: 'bg-emerald-500' },
    { name: 'Культура', color: 'bg-purple-500' },
    { name: 'Здоровье', color: 'bg-blue-500' },
    { name: 'Семья', color: 'bg-amber-500' },
    { name: 'Спорт', color: 'bg-blue-500' },
    { name: 'Психология', color: 'bg-pink-500' },
    { name: 'Образование', color: 'bg-orange-500' },
    { name: 'Карьера', color: 'bg-orange-500' },
    { name: 'Финансы', color: 'bg-emerald-500' },
    { name: 'Технологии', color: 'bg-indigo-500' },
];

const MATERIAL_TYPES = [
    { value: 'article', label: 'Статья' },
    { value: 'video', label: 'Видео' },
    { value: 'book', label: 'Книга' },
];

export default function CreateMaterialForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false)

    const [formData, setFormData] = useState({
        title: '',
        imageUrl: '',
        author: '',
        date: new Date().toISOString().split('T')[0],
        category: '',
        categoryColor: '#FF6B6B',
        type: 'article' as 'article' | 'video' | 'book',
        url: '',
        introduction: '',
        explanation: '',
        conclusion: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCategorySelect = (categoryName: string, color: string) => {
        setFormData(prev => ({
            ...prev,
            category: categoryName,
            categoryColor: color
        }));
    };

    const resetFields = () => {
        setFormData({
            title: '',
            imageUrl: '',
            author: '',
            date: new Date().toISOString().split('T')[0],
            category: '',
            categoryColor: '#FF6B6B',
            type: 'article',
            url: '',
            introduction: '',
            explanation: '',
            conclusion: '',
        });
    }


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            if (!formData.category.trim()) {
                alert('Пожалуйста, выберите категорию');
                return
            }

            const response = await fetch('/api/materials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Ошибка при сохранении материала');
            }

            const result = await response.json();

            if (result.success) {
                alert('Материал успешно создан!');
                resetFields()
                setIsSubmitted(true)
            } else {
                throw new Error('Неизвестная ошибка');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Произошла ошибка при создании материала');
            console.error('Error creating material:', err);
        } finally {
            setIsSubmitting(false);
            setIsSubmitted(false)
        }
    };

    const getColorHex = (twColor: string): string => {
        const colorMap: Record<string, string> = {
            'bg-red-500': '#EF4444',
            'bg-orange-500': '#F97316',
            'bg-yellow-500': '#EAB308',
            'bg-green-500': '#22C55E',
            'bg-blue-500': '#3B82F6',
            'bg-indigo-500': '#6366F1',
            'bg-purple-500': '#8B5CF6',
            'bg-pink-500': '#EC4899',
            'bg-rose-500': '#F43F5E',
            'bg-amber-500': '#F59E0B',
            'bg-lime-500': '#84CC16',
            'bg-emerald-500': '#10B981',
            'bg-teal-500': '#14B8A6',
            'bg-cyan-500': '#06B6D4',
            'bg-sky-500': '#0EA5E9',
            'bg-violet-500': '#8B5CF6',
            'bg-fuchsia-500': '#D946EF',
        };

        return colorMap[twColor] || '#3B82F6';
    };
    return (
        <form onSubmit={handleSubmit}>

            {error && (<div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-700 font-medium">Ошибка: {error}</p>
            </div>)}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Название материала
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="Введите название материала"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Автор
                    </label>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="Имя автора"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Дата публикации
                    </label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ссылка на превью
                    </label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="/image.jpg"
                        required
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ссылка на материал
                    </label>
                    <input
                        type="url"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="https://example.com/material"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Тип материала
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {MATERIAL_TYPES.map((type) => (
                            <button
                                key={type.value}
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, type: type.value as any }))}
                                className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${formData.type === type.value
                                    ? 'bg-primary text-white shadow-sm'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {type.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Категория
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category.name}
                                type="button"
                                onClick={() => handleCategorySelect(category.name, category.color)}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                                    formData.category === category.name
                                        ? "ring-2 ring-offset-2"
                                        : "opacity-90 hover:opacity-100"
                                )}
                                style={{
                                    backgroundColor: `${getColorHex(category.color)}20`,
                                    color: getColorHex(category.color),
                                    borderColor: getColorHex(category.color),
                                }}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                    {formData.category && (
                        <div className="mt-3 flex items-center gap-2">
                            <div
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: getColorHex(formData.categoryColor) }}
                            />
                            <span className="text-sm text-gray-600">
                                Выбрана: {formData.category}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-6 mb-8">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Введение
                    </label>
                    <textarea
                        name="introduction"
                        value={formData.introduction}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="Краткое введение в материал..."
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Основное содержание
                    </label>
                    <textarea
                        name="explanation"
                        value={formData.explanation}
                        onChange={handleChange}
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="Подробное описание материала..."
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Заключение
                    </label>
                    <textarea
                        name="conclusion"
                        value={formData.conclusion}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="Выводы и итоги..."
                        required
                    />
                </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-4 pt-6 border-t border-gray-100">
                <button
                    className="w-full sm:w-auto px-6 py-3 text-center border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                    onClick={() => resetFields()}
                >
                    Очистить все
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3 bg-primary text-white font-medium rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Сохранение...
                        </>
                    ) : (
                        'Создать материал'
                    )}
                </button>
                {isSubmitted && (<LinkToMaterials />)}
            </div>
        </form>
    )
}