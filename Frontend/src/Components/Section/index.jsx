import "./style.scss";

export default function SectionComponent({children, customClass, label, style}){



    return(
        <section style={{...style}} id={"section-component"} className={customClass}>
            <div className="title">
                <span className="label">{label}</span>
            </div>
            {children}
        </section>
    )
}