import "./style.scss";

export default function SectionComponent({children, customClass, label}){



    return(
        <section id={"section-component"} className={customClass}>
            <div className="title">
                <span className="label">{label}</span>
            </div>
            {children}
        </section>
    )
}