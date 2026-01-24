'use server'

import fs from 'fs/promises'
import path from 'path'

const webpush = require('web-push')

const SUBSCRIPTIONS_FILE = path.join(process.cwd(), 'app/data/subscriptions.json')

interface Subscription {
    userId: string;
    endpoint: string;
    p256dh: string;
    auth: string;
    createdAt: string;
}

if (webpush.setVapidDetails) {
    webpush.setVapidDetails(
        'mailto:prusakovr073@gmail.com',
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
        process.env.VAPID_PRIVATE_KEY!
    )
}

async function readSubscriptions(): Promise<Subscription[]> {
    try {
        const data = await fs.readFile(SUBSCRIPTIONS_FILE, 'utf-8')
        return JSON.parse(data)
    } catch {
        return []
    }
}

async function writeSubscriptions(data: Subscription[]) {
    await fs.mkdir(path.dirname(SUBSCRIPTIONS_FILE), { recursive: true })
    await fs.writeFile(SUBSCRIPTIONS_FILE, JSON.stringify(data, null, 2))
}

export async function subscribeUser(userId: string, subscriptionData: any) {
    const subs = await readSubscriptions()

    const filtered = subs.filter(
        sub => !(sub.userId === userId && sub.endpoint === subscriptionData.endpoint)
    )

    filtered.push({
        userId,
        endpoint: subscriptionData.endpoint,
        p256dh: subscriptionData.keys.p256dh,
        auth: subscriptionData.keys.auth,
        createdAt: new Date().toISOString()
    })

    await writeSubscriptions(filtered)
    return { success: true }
}

export async function unsubscribeUser(userId: string, endpoint: string) {
    const subs = await readSubscriptions()
    const filtered = subs.filter(
        sub => !(sub.userId === userId && sub.endpoint === endpoint)
    )

    await writeSubscriptions(filtered)
    return { success: true }
}

export async function getSubscriptionsByUser(userId: string) {
    const subs = await readSubscriptions()
    return subs.filter(sub => sub.userId === userId)
}

export async function sendNotificationToUser(userId: string, title: string, message: string) {
    const subs = await getSubscriptionsByUser(userId)

    if (subs.length === 0) {
        return { success: false, error: 'No subscriptions found' }
    }

    const results = []

    for (const sub of subs) {
        try {
            await webpush.sendNotification(
                {
                    endpoint: sub.endpoint,
                    keys: { p256dh: sub.p256dh, auth: sub.auth }
                },
                JSON.stringify({
                    title,
                    body: message,
                    icon: '/pwa-logo.png',
                })
            )
            results.push({ endpoint: sub.endpoint, success: true })
        } catch (error) {
            console.error('Error sending to', sub.endpoint, error)
            results.push({ endpoint: sub.endpoint, success: false, error: error })
        }
    }

    return {
        success: results.some(r => r.success),
        results,
        sent: results.filter(r => r.success).length
    }
}

// ТРИГГЕРЫ
export async function notifyNewMaterial(userId: string, materialTitle: string) {
    return sendNotificationToUser(
        userId,
        '📚 Новый материал',
        `Доступен новый материал: "${materialTitle}"`
    )
}

export async function notifyDeadline(userId: string, taskName: string, daysLeft: number) {
    return sendNotificationToUser(
        userId,
        '⏰ Дедлайн',
        `Осталось ${daysLeft} дней на задачу: "${taskName}"`
    )
}

// Тестовое уведомление
export async function sendTestNotification(userId: string) {
    return sendNotificationToUser(
        userId,
        '✅ Тест PWA',
        'Push-уведомления работают!'
    )
}

export async function notifyAllUsers(title: string, message: string) {
    const subs = await readSubscriptions()
    const uniqueUserIds = Array.from(new Set(subs.map(s => s.userId)))

    const results = []

    for (const userId of uniqueUserIds) {
        const result = await sendNotificationToUser(userId, title, message)
        results.push({ userId, ...result })
    }

    return {
        success: true,
        notifiedUsers: uniqueUserIds.length,
        results
    }
}

export async function notifyUsersAboutNewMaterial(materialTitle: string, targetUserIds: string[]) {
    const results = []

    for (const userId of targetUserIds) {
        const result = await sendNotificationToUser(
            userId,
            '📚 Новый материал',
            `Доступен новый материал: "${materialTitle}"`
        )
        results.push({ userId, ...result })
    }

    return results
}

export async function notifyAllAboutNewMaterial(materialTitle: string) {
    const allSubs = await readSubscriptions()
    const uniqueUserIds = Array.from(new Set(allSubs.map(s => s.userId)))

    return notifyUsersAboutNewMaterial(materialTitle, uniqueUserIds)
}