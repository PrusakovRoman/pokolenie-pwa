import NextAuth from "next-auth";
import Credentials from 'next-auth/providers/credentials'
import { MockDataFactory } from "@/lib/security/mock-data-factory";
import { verifyPassword } from "@/lib/security/password";
import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        console.log('Отсутствует email или пароль');
                        return null;
                    }

                    const email = credentials.email as string;
                    const password = credentials.password as string;

                    const user = await MockDataFactory.getUserByEmail(email);

                    if (!user) {
                        console.log('Пользователь не найден');
                        await new Promise(resolve => setTimeout(resolve, 500));
                        return null;
                    }

                    const isValid = await verifyPassword(password, user.password);

                    if (!isValid) {
                        console.log('Неверный пароль');
                        return null;
                    }

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                        image: user.image,
                        mentor: user.mentor,
                        createdAt: user.createdAt
                    };
                }
                catch (error) {
                    console.log('Ошибка авторизации', error);
                    return null;
                }
            }
        })
    ],

    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
                token.image = user.image;
                token.mentor = user.mentor;
                token.createdAt = user.createdAt;
            }

            if (trigger === "update" && session?.user) {
                token = { ...token, ...session.user };
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user && token) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.role = token.role as string
                session.user.image = token.image as string;
                session.user.mentor = token.mentor as string;
                session.user.createdAt = token.createdAt as string;
            }

            return session;
        },

        async redirect({ url, baseUrl }) {
            return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard`;
        }
    },

    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60
    },

    debug: process.env.NODE_ENV === 'development',
    trustHost: true,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);