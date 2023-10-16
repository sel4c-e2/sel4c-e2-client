import style from '@/assets/styles/Page.module.css';

export default function PageLayout({ children }) {
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
