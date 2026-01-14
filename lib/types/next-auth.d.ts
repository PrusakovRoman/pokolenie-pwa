import NextAuth from "next-auth";
import type { UserRole } from "./user";

declare module "next-auth" {
    interface User {
        role?: UserRole
    }

    interface Session {
        user: {
            id: string;
            role?: UserRole;
        } & DefaultSession["user"]
    }
}

declare module "@auth/core/jwt" {
    interface JWT {
        role?: UserRole;
        id?: string;
    }
}