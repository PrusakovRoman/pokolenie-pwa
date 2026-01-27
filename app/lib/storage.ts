const STORAGE_KEY = 'materials_data';

export const storage = {
    get: () => {
        if (typeof window === 'undefined') return null;
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : null;
    },

    set: (data: any) => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    },

    // Для уведомлений
    getLastSeen: () => {
        return localStorage.getItem('last_seen_material_id') || '0';
    },

    setLastSeen: (id: string) => {
        localStorage.setItem('last_seen_material_id', id);
    }
};