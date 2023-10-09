import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { DataContext } from '@/context/DataContext';

import AuthLayout from '@/components/Layouts/AuthLayout';
import SignupForm from '@/components/Forms/SignupForm';

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
        <main>
            <AuthLayout>
                <h1>Crea tu cuenta</h1>
                <SignupForm />
            </AuthLayout>
        </main>
    );
};
