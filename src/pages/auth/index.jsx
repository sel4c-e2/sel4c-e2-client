import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { DataContext } from '@/context/DataContext';

export default function Auth() {
    const { isLogged } = useContext(DataContext);
    const router = useRouter();

    useEffect(() => {
        const returnTo = router.query.returnTo || "dashboard";
        if (isLogged) {
            router.push('/' + returnTo);
        } else {
            router.push('/auth/login');
        }
    }, [isLogged, router]);
    
    return null;
};
