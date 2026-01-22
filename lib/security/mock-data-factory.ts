import { hashPassword } from "@/lib/security/password";
import type { MockUser } from '@/lib/types/user'

export class MockDataFactory {
    private static usersCache: MockUser[] | null = null

    static async getUsers(): Promise<MockUser[]> {
        if (this.usersCache) return this.usersCache

        this.usersCache = await Promise.all([this.createUser('1', 'user@gmail.com', 'user123', 'Роман Прусаков', '/profile.webp', 'Марсель Габдульманов', '30.11.2025'),
        this.createUser('2', 'manager@mail.ru', 'manager123', 'Иван Иванов', '/no-photo.jpg', 'Петр Петров', '15.03.2024')])

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
        image: string,
        mentor: string,
        createdAt: string
    ): Promise<MockUser> {
        return {
            id,
            email,
            password: await hashPassword(plainPassword),
            name,
            image,
            mentor,
            createdAt
        }
    }
}