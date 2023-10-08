import style from '@/assets/styles/AuthLayout.module.css';

export default function AuthLayout({ children }) {
    return (
        <section className={style.section}>
            <div className={style.sectionContainer + ' container'}>
                <div className={style.content}>
                    {children}
                </div>
            </div>
        </section>
    );
}
