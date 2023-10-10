import style from '@/assets/styles/Activity.module.css';

export default function ActivitiesLayout({ children }) {
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
