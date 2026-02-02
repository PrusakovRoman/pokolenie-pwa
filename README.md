1. PWA для проекта "Поколение" с акцентом на работу с материалами

2. Стек: Next.js, App Router, next-pwa, NextAuth, TypeScript, Tailwind, shadcn/ui, Redis, Vercel

3. Локальный запуск: npm run dev

4. Структура, особенности: 
/app/lib - локальные утилиты
/lib - общие утилиты, типы, конфигурация
/app/ui - самописные ui-компоненты
/components - ui-компоненты shadcn
/auth.config.ts - маршрутизация отдельно

5. Аутентификация:

Используется NextAuth.js с mock-данными для демонстрации.

Тестовые пользователи:
- **Участник:** `user@gmail.com` / `user123`
- **Администратор:** `admin@mail.ru` / `admin123`

Архитектура:
- Credentials провайдер с email/password
- JWT-сессии (30 дней)
- Ролевая модель (участник/администратор)
- Защита маршрутов в auth.config.ts

6. Работа данными:
Используется Redis через Upstash. Все операции реализованы в /app/api.
/app/ui/materials/hooks/use-materials - кастомный хук для работы с материалами на клиенте

8. Настройка Redis: 
Все переменные лежат в /.env.local

9. Доработки:
-Уведомления: реализован интерактивный ui компонент тоггла, хранится в /app/ui/notifications, импортируется в /app/ui/user-menu.tsx
-Страница наставника: /app/mentor - нужно только добавить информацию по наставникам и сделать динамический путь через [id]

10. Контакты:
Прусаков Роман
email: prusakovr073@gmail.com
tg: @prusakovvr