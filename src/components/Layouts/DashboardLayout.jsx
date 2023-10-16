import style from '@/assets/styles/Dashboard.module.css';

export default function DashboardLayout({ children }) {
    return (
        <section className={style.section}>
            <div className={style.sectionContainer + ' container'}>
                <div className={style.content + ' row'}>
                    {children}
                </div>
            </div>
        </section>
    );
}
