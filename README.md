1. PWA для проекта "Поколение" с акцентом на работу с материалами
2. Стек: Next.js, App Router, next-pwa, NextAuth, TypeScript, Tailwind, shadcn/ui, Redis, Vercel
3. Локальный запуск: npm run dev
4. Структура: 

5. Авторизация: 
Сейчас используются Mock-данные(см. /lib/security/mock-data-factory.ts), пароли хэшируются bcrypt
В /auth.config.ts реализована маршрутизация; в /lib/auth.ts - сама авторизация с использованием Credentials provider; и сохранение данных в сессию

6. Работа с бд идет через api в папке /app/api

7. UI/UX:

8. Настройка Redis: 

9. Доработки:
-Уведомления: реализован ui компонент тоггла, хранится в /app/ui/notifications, импортируется в /app/ui/user-menu.tsx
-Страница наставника: /app/mentor - нужно только добавить информацию по наставникам и сделать динамический путь через [id]
-Восстановление пароля: в /app/ui/login-form.tsx сделана ссылка с alert

10. По всем вопросам tg: @prusakovvr