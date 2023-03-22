
import React,{useEffect,useState} from "react";
import {useModalState,withModalState} from "../hooks/modalState";

let last_edits = ['dur','end'] // one of: start , end , dur


function AddRecord(props) {

    const {showAddModal, setShowAddModal} = props.modalState;
    const [input_text, set_input_text] = useState('')
    const [start_time, set_start_time] = useState('')
    const [end_time, set_end_time] = useState('')
    const [dur, setDur] = useState(30)
    

    useEffect(()=>{
        if(showAddModal){
            set_input_text('')
            setDur(30)
            let now = new Date()
            let hours = now.getHours()
            let minutes = now.getMinutes()
            if (hours<10) hours = "0"+hours
            if (minutes<10) minutes = "0"+minutes
            set_end_time(hours+":"+minutes)
        }

    },[showAddModal])


    return  <div className="modal" style={{display:showAddModal?"block":"none"}}>
                <div className="position-relative">
                    {/* back button */}
                    <button
                        className="back_button"
                        onClick={()=>{
                            setShowAddModal(false)
                        }}
                    >{"🔙"}</button>
                    در مدت <input  
                        className="text_input dur_input"
                        value={dur} 
                        onChange={(e)=>{
                            setDur(e.target.value)
                        }}
                        type="tel"
                    ></input>
                    دقیقه‌ی گذشته
                    <br/>
                    <span dir='rtl' > 
                    این کار ها را نجام دادم:
                    </span>
                    <textarea  
                        className="text_input"
                        id="text_input"
                        value={input_text} 
                        onChange={(e)=>{
                            set_input_text(e.target.value)
                        }}
                    />
                    <br/>
                    <input
                        className="time_input mt-3"
                        value={end_time}
                        type="time"
                        onChange={(e)=>{
                            set_end_time(e.target.value)
                        }}
                    />
                    <br/>
                    <button
                        className="btn btn-success add-btn2"
                        onClick={()=>{
                            if (input_text=="")
                            return;
                            setShowAddModal(false)
                            if (input_text=="آخری پاک شود") {
                                props.deleteLast()
                                return
                            }
                            if (input_text=="همه پاک شود") {
                                props.deleteAll()
                                return
                            }
                            
                            props.addItem(input_text, dur, end_time)
                        }}
                    >Add</button>
                </div>
            </div>
}
export default withModalState(AddRecord);