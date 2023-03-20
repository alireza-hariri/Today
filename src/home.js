
import React from 'react'
import History from './components/history.jsx'

class Home extends React.Component {
    constructor() {
        super();
        // JSON.parse(window.localStorage.getItem('state')) ||
        this.state =  {
            items:{},
            show_modal:false,
            input_text:"",
            input_time:"",
        }
        if (window.localStorage.getItem('state')) {
            let old_state = JSON.parse(window.localStorage.getItem('state'))
            if (typeof old_state.items == "object") {
                this.state.items = old_state.items
            }
        }
        if ((this.today() in this.state.items)==false) {
            this.state.items[this.today()] = []
        }
        console.log(this.state)
    }
    today(){
        // return date of day
        return new Date().toLocaleDateString()
    }
    reset_state(reset_all=false) {
        let new_items = this.state.items
        if (reset_all){
            new_items = {}
        }else{
            new_items[this.today()] = []
        }

        this.setState({
            items:new_items,
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
    getItems() {
        return this.state.items[this.today()]
    }
    addItem(text, time) {
        this.setState({
            items:{
                ...this.state.items,
                [this.today()]:[
                    ...this.getItems(),
                    {
                        text:text,
                        time:time,
                    }
                ]
            },
            show_modal:false,
            input_text:"",
        }, true)
    }
    render() {
        return <div>
            <div 
                className='app-bar'
            >
                    <img className='burger' src='/Hamburger_icon.png'/>
                    <img className='edit-icon' src='/edit.png'/>
                <div class='app-bar-text'>today</div>
            </div>
            <History 
                data={this.state.items}
            />
            {this.getItems().map((item,idx)=>{
                return <div
                    className="item"
                    key={idx}
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
                <div className="position-relative">
                    {/* back button */}
                    <button
                        className="back_button"
                        onClick={()=>{
                            this.setState({show_modal:false})
                        }}
                    >{"🔙"}</button>
                    
                    <textarea  
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
                        className="btn btn-success add-btn2"
                        onClick={()=>{
                            if (this.state.input_text=="")
                                return;
                            if (this.state.input_text=="همه پاک شود") {
                                this.reset_state();
                                return;
                            }
                            
                            this.addItem(this.state.input_text, this.state.input_time)

                        }}
                    >Add</button>
                </div>
            </div>
        
        </div>
    }
  }
  

export default Home;