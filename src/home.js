
import React from 'react'

class Home extends React.Component {
    constructor() {
        super();
        this.state = JSON.parse(window.localStorage.getItem('state')) || {
            items:[],
            show_modal:false,
            input_text:"",
            input_time:"",
        }
      }
    reset_state() {
        this.setState({
            items:[],
            show_modal:false,
            input_text:"",
            input_time:"",
        })
    }
    setState(state, persist=false) {
        if (persist)
            window.localStorage.setItem('state', JSON.stringify(state));
        super.setState(state);
    }
    render() {
        return <div>
            {this.state.items.map((item)=>{
                return <div
                    className="item"
                >{item.text}
                <span>{item.time}</span>
                </div>
            })}
            <button
                className='add_button'
                onClick={()=>{
                    // open modal
                    this.setState({
                        show_modal:true,
                        input_text:"",
                    })
                    // set input_time to current time
                    let now = new Date()
                    let hours = now.getHours()
                    let minutes = now.getMinutes()
                    if (hours<10) hours = "0"+hours
                    if (minutes<10) minutes = "0"+minutes
                    this.setState({input_time:hours+":"+minutes})
                    // focus on input_text and open keyboard
                    setTimeout(()=>{
                        document.getElementById("text_input").focus()
                    },100)


                    

                }}
            >+</button>
            

            
            {/* the modal */}


            <div className="modal" style={{display:this.state.show_modal?"block":"none"}}>
                <div classNme="position-relative">
                    {/* back button */}
                    <button
                        className="back_button"
                        onClick={()=>{
                            this.setState({show_modal:false})
                        }}
                    >{"🔙"}</button>
                    
                    <input 
                        className="text_input"
                        id="text_input"
                        value={this.state.input_text} 
                        onChange={(e)=>{
                            this.setState({input_text:e.target.value})
                        }}
                    />
                    <br/>
                    <input
                        className="time_input mt-3"
                        value={this.state.input_time}
                        type="time"
                        onChange={(e)=>{
                            this.setState({input_time:e.target.value})
                        }}
                    />
                    {/* <input
                        value={this.state.M}
                        onChange={(e)=>{
                            this.setState({M:e.target.value})
                        }}
                    /> */}
                    <br/>
                    <button
                        className="btn btn-success mt-3"
                        onClick={()=>{
                            if (this.state.input_text=="")
                                return;
                            if (this.state.input_text=="همه پاک شود") {
                                this.reset_state();
                                return;
                            }
                            
                            this.setState({
                                items:[
                                    ...this.state.items,
                                    {
                                        text:this.state.input_text,
                                        time:this.state.input_time,
                                    }
                                ],
                                show_modal:false,
                                input_text:"",
                            }, true)
                        }}
                    >Add</button>
                </div>
            </div>
        
        </div>
    }
  }
  

export default Home;