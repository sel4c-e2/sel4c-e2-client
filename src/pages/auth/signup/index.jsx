import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { DataContext } from '@/context/DataContext';

import AuthLayout from '@/components/Layouts/AuthLayout';
import SignupForm from '@/components/Forms/SignupForm';

export default function Signup() {
    const router = useRouter();
    const { isLogged } = useContext(DataContext);

    useEffect(() => {
        if (isLogged) {
            router.push('/dashboard');
        }
    }, [isLogged]);
    
    return (
        <main>
            <AuthLayout>
                <h1>Crea tu cuenta</h1>
                <SignupForm />
            </AuthLayout>
        </main>
    );
};
