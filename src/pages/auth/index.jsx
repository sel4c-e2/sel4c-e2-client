import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { DataContext } from '@/context/DataContext';

export default function Auth() {
    const { isLogged } = useContext(DataContext);
    const router = useRouter();

    useEffect(() => {
        if (isLogged) {
            router.push('/dashboard');
        } else {
            router.push('/auth/login');
        }
    }, []);
    
    return null;
};
