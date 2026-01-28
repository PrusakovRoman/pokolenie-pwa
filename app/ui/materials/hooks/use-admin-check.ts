'use client'
import { checkIsAdmin } from "@/app/lib/actions"
import { useState, useEffect } from "react"

export function useAdminCheck() {
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        async function checkAdmin() {
            try {
                const result = await checkIsAdmin()
                setIsAdmin(result)
            } catch (error) {
                console.error('Error checking admin status:', error);
                setIsAdmin(false)
            }
        }
        checkAdmin()
    }, [])

    return isAdmin
}