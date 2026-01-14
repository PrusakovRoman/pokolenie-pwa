export type UserRole = 'admin' | 'manager' | 'user'

export interface MockUser {
    id: string;
    email: string;
    password: string;
    name: string;
    role: UserRole;
    createdAt: string;
}

export interface SafeUser {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    createdAt?: string;
}