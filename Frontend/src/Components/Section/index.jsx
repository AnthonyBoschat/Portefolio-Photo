import "./style.scss";

export default function SectionComponent({children, customClass, label, style}){



    return(
        <section style={{...style}} id={"section-component"} className={customClass}>
            <div className="title">
                {customClass === "home-contact" && <span>Un projet ? {" "}</span>}
                <span className="label">{label}</span>
            </div>
            {children}
        </section>
    )
}