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
                console.log('authorize:', credentials?.email)
                try {
                    if (!credentials?.email || !credentials?.password) {
                        console.log('Отсутствует email или пароль')
                        return null
                    }

                    const email = credentials.email as string
                    const password = credentials.password as string

                    const user = await MockDataFactory.getUserByEmail(email)

                    if (!user) {
                        console.log('Пользователь не найден')
                        await new Promise(resolve => setTimeout(resolve, 500))
                        return null
                    }

                    const isValid = await verifyPassword(credentials.password as string, user.password)

                    if (!isValid) {
                        console.log('неверный пароль')
                        return null
                    }

                    return { id: user.id, email: user.email, name: user.name, role: user.role }
                }
                catch (error) {
                    console.log('Ошибка авторизации', error)
                    return null
                }
            }
        })], callbacks: {
            async jwt({ token, user }) {
                if (user) {
                    token.role = user.role
                    token.id = user.id
                }
                return token
            },
            async session({ session, token }) {
                if (session.user) {
                    session.user.id = token.id as string
                    session.user.role = token.role as string
                }
                return session
            },


            async redirect({ url, baseUrl }) {
                // Разрешаем редирект
                return url.startsWith(baseUrl) ? url : `${baseUrl}/profile`
            }
        },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60
    },
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)