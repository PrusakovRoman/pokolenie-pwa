import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            name?: string | null
            email?: string | null
            role?: string | null
            image?: string | null
            mentor?: string
            createdAt?: string
        }
    }

    interface User {
        id: string
        name?: string | null
        email?: string | null
        role?: string | null
        image?: string | null
        mentor?: string
        createdAt?: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
        name?: string
        role?: string | null
        email?: string
        image?: string
        mentor?: string
        createdAt?: string
    }
}