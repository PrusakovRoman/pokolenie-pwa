import bcrypt from 'bcryptjs'

const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
    if (!password || password.length < 3) {
        throw new Error('Пароль должен содержать минимум 3 символа')
    }
    return await bcrypt.hash(password, SALT_ROUNDS)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    if (!password || !hashedPassword) return false
    return await bcrypt.compare(password, hashedPassword)
}