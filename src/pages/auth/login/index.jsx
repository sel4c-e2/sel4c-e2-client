import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { DataContext } from '@/context/DataContext';

import AuthLayout from '@/components/Layouts/AuthLayout';
import LoginForm from '@/components/Forms/LoginForm';

export default function Signup() {
    const { isLogged } = useContext(DataContext);
    const router = useRouter();

    useEffect(() => {
        if (isLogged) {
            router.push('/dashboard');
        }
    }, []);
    
    return (
        <main>
            <AuthLayout>
                <h1>Inicia sesion</h1>
                <LoginForm />
            </AuthLayout>
        </main>
    );
};
