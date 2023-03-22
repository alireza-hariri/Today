
import React,{useEffect,useState} from "react";
import {useModalState,withModalState} from "../hooks/modalState";

function Menu(props) {
    const {menuOpen, setMenuOpen} = props.modalState;
    const [Day,setDay] = useState(null)

    
    return (
        <div className="modal " style={{display:menuOpen?"block":"none"}}>
         منو
        </div>
    )
}
export default withModalState(Menu);