import { hashPassword } from "@/lib/security/password";
import type { MockUser, UserRole } from '@/lib/types/user'

export class MockDataFactory {
    private static usersCache: MockUser[] | null = null

    static async getUsers(): Promise<MockUser[]> {
        if (this.usersCache) return this.usersCache

        this.usersCache = await Promise.all([this.createUser('1', 'admin@gmail.com', 'admin123', 'Администратор', 'admin'),
        this.createUser('2', 'manager@mail.ru', 'manager123', 'Менеджер', 'manager'),
        this.createUser('3', 'user@ya.ru', 'user123', 'Пользователь', 'user'),])

        return this.usersCache
    }

    static async getUserByEmail(email: string): Promise<MockUser | undefined> {
        const users = await this.getUsers()
        return users.find(user => user.email === email)
    }

    private static async createUser(
        id: string,
        email: string,
        plainPassword: string,
        name: string,
        role: UserRole): Promise<MockUser> {
        return {
            id,
            email,
            password: await hashPassword(plainPassword),
            name,
            role,
            createdAt: new Date().toISOString()
        }
    }
}