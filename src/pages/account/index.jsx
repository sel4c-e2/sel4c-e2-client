import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'
import Link from 'next/link';

import { DataContext } from '@/context/DataContext';

import AuthLayout from '@/components/Layouts/AuthLayout';
import EditProfileForm from '@/components/Forms/EditProfileForm';
import EditPasswordForm from '@/components/Forms/EditPasswordForm';
import BackLink from '@/components/Widgets/BackLink';

import style from '@/assets/styles/Page.module.css';

export default function Account() {
    const router = useRouter();
    const { isLogged, user } = useContext(DataContext);

    useEffect(() => {
        if (!isLogged) {
            router.push('/auth/login?returnTo=account');
        }
    }, [isLogged, router]);
    
    return (
        <>
            <Head>
                <title>Iniciar sesion</title>
            </Head>
            <main>
                <AuthLayout>
                    <BackLink />
                    <h1 className={style.title}>{user.name} {user.lastname}</h1>
                    <EditProfileForm />
                    <hr />
                    <EditPasswordForm />
                </AuthLayout>
            </main>
        </>
    );
};
