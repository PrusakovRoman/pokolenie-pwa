export interface PushSubscription {
    endpoint: string;
    keys: {
        p256dh: string;
        auth: string;
    };
    email: string;
    role: string;
    enabled: boolean;
    createdAt: string;
}

export interface NotificationPayload {
    title: string;
    body: string;
    icon?: string;
    badge?: string;
    tag?: string;
    data?: {
        url: string;
        materialId: string;
        [key: string]: any;
    };
}