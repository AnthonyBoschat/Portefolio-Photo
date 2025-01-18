import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { useEffect } from "react";
import { setOpenPhoneMenu } from "@Redux/Slices/phoneState";

export default function PhoneMenuContainer(){

  const phoneMenuOpen = useSelector(store => store.phoneState.menuOpen)
  const dispatch = useDispatch()

  useEffect(() => {
    if(phoneMenuOpen){
        
        const closePhoneMenu = (e) => {
            console.log(e.target.classList)
            if(e.target.classList.contains("overlay")){
                dispatch(setOpenPhoneMenu(false))
            }
        }

        window.addEventListener("click", closePhoneMenu)

        return () => {
            window.removeEventListener("click", closePhoneMenu)
        }
    }


    

  }, [phoneMenuOpen])

    return(
        <div className={`overlay ${!phoneMenuOpen ? "pointerNone" : "" }`}>
            <nav className={`phone-menu-container ${phoneMenuOpen ? "open" : ""}`}>
                <span style={{color:"red"}}>
                    qdqdqdqzd
                </span>
                {/* <a href="#">qzdqdz</a>
                <a href=""></a>
                <a href=""></a>
                <a href=""></a> */}
            </nav>
        </div>
    )
}