import { DataProvider } from '@/context/DataContext';

import Navbar from '@/components/Navbar';

export default function Layout({ children }) {
    return (
        <DataProvider>
            <Navbar />
            {children}
        </DataProvider>
    );
}
