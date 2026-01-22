export interface MockUser {
    id: string;
    email: string;
    password: string;
    name: string;
    image: string;
    mentor: string;
    createdAt: string;
}

export interface SafeUser {
    id: string;
    email: string;
    name: string;
    image: string;
    mentor: string;
    createdAt: string;
}