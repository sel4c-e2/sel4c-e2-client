import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'

import { DataContext } from '@/context/DataContext';

import AuthLayout from '@/components/Layouts/AuthLayout';
import LoginForm from '@/components/Forms/LoginForm';

export default function Signup() {
    const router = useRouter();
    const { isLogged } = useContext(DataContext);

    useEffect(() => {
        const returnTo = router.query.returnTo || "dashboard";
        if (isLogged) {
            router.push('/' + returnTo);
        }
    }, [isLogged, router]);
    
    return (
        <>
            <Head>
                <title>Iniciar sesion</title>
            </Head>
            <main>
                <AuthLayout>
                    <h1>Iniciar sesión</h1>
                    <LoginForm />
                </AuthLayout>
            </main>
        </>
    );
};
