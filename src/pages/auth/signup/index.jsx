import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { DataContext } from '@/context/DataContext';

import AuthLayout from '@/components/Layouts/AuthLayout';
import SignupForm from '@/components/Forms/SignupForm';

export default function Signup() {
    const { isLogged } = useContext(DataContext);
    const router = useRouter();

    // useEffect(() => {
    //     if (isLogged) {
    //         router.push('/dashboard');
    //     } else {
    //         router.push('/auth/login');
    //     }
    // }, []);
    
    return (
        <AuthLayout>
            <h1>Crea tu cuenta</h1>
            <SignupForm />
        </AuthLayout>
    );
};
