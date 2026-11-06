import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';

export default async function DashboardLayout({ children }) {
    const cookieStore = await cookies();
    const token = cookieStore.get('jwt')?.value;

    if (!token) {
        redirect('/pages/login');
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        redirect('/pages/login');
    }

    return children;
}