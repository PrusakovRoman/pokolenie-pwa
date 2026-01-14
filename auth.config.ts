import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
        error: '/auth/error'
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user

            const publicPaths = ['/', '/login']
            const isPublic = publicPaths.includes(nextUrl.pathname)

            const protectedPaths = ['/profile',]
            const isProtected = protectedPaths.some(path => nextUrl.pathname.startsWith(path))

            if (isProtected && !isLoggedIn) return false

            if (isPublic && isLoggedIn) return Response.redirect(new URL('/profile', nextUrl))

            return true
        }
    },
    debug: process.env.NODE_ENV === 'development',
    providers: []
} satisfies NextAuthConfig