import { useSelector } from "react-redux";
import "./style.scss";

export default function SectionComponent({children, customClass, label, style}){

    const {desktop} = useSelector(store => store.app)

    return(
        <section style={{...style}} id={"section-component"} className={customClass}>
            <div className="title">
                {(customClass === "home-contact" && desktop) && <span>Un projet ? {" "}</span>}
                <span className="label">{label}</span>
            </div>
            {children}
        </section>
    )
}