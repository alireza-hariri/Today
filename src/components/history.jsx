
import React,{useEffect,useState} from "react";
import {useModalState,withModalState} from "../hooks/modalState";

function History(props) {


        const {showDayModal, setShowDayModal} = props.modalState;
        const [Day,setDay] = useState(null)
        useEffect(()=>{
            setDay(null)
        },[showDayModal])
        
        return (
            <div className="modal modal-trasparent" style={{display:showDayModal?"block":"none"}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title px-3">تاریخ</h5> 
                            <button type="button" className="close" onClick={()=>setShowDayModal(false)}>&times;</button>
                        </div>
                        <div className="modal-body">
                            
                        {Day==null & Object.entries(props.data).map(([date,items],idx)=>{
                            return <div
                                className="item"
                                key={idx}
                                onClick={()=>setDay(date)}
                            >{date}
                            <span className='smaller'>{items.length} مورد</span>
                            </div>
                        })}
                        </div>
                    </div>
                </div>
            </div>


        );
}
export default withModalState(History);