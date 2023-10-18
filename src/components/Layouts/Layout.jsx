import { DataProvider } from '@/context/DataContext';

import Navbar from '@/components/Navbar';
import Modal from '@/components/Widgets/Modal';

export default function Layout({ children }) {
    return (
        <DataProvider>
            <Modal />
            <Navbar />
            {children}
        </DataProvider>
    );
}
