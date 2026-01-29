import { getCurrentUser } from '@/app/lib/actions';
import NotificationToggle from './toggle';

export default async function NotificationToggleWrapper() {
    try {
        const user = await getCurrentUser();

        if (!user?.email) {
            return null;
        }

        return <NotificationToggle userEmail={user.email} />;
    } catch (error) {
        console.error('Error in NotificationToggleWrapper:', error);
        return null;
    }
}