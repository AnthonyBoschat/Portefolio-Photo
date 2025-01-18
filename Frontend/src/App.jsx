import Header from "@Containers/Header";
import PhoneMenuContainer from "@Containers/phoneMenu";
import HomePage from "@Pages/Home";
import "./App.scss"
import { useSelector } from "react-redux";


export default function App() {

  const phoneMenuOpen = useSelector(store => store.phoneState.menuOpen)


  return (
      <>
        <Header/>
        <HomePage/>
        <PhoneMenuContainer/>
        
      </>
  )
}
