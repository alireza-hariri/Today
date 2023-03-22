
import React from 'react'
import History from './components/history.jsx'
import Menu from './components/menu.jsx'
import AddRecord from './components/add_new.jsx'
import {useModalState,withModalState} from "./hooks/modalState";


class Home extends React.Component {
    constructor() {
        super();
        // JSON.parse(window.localStorage.getItem('state')) ||
        this.state =  {
            items:{},
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
        // return date of today
        return new Date().toLocaleDateString()
    }

    reset_state(reset_all=false) {
        let new_items = this.state.items
        if (reset_all){
            new_items = {} // reset all days
        }else{
            new_items[this.today()] = []
        }
        this.setState({
            items:new_items,
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

    addItem(text, dur, end_time) {
        this.setState({
            items:{
                ...this.state.items,
                [this.today()]:[
                    ...this.getItems(),
                    {
                        text: text,
                        time: end_time,
                        dur: dur,
                    }
                ]
            },
        }, true)
    }

    render() {
        const { setShowAddModal} = this.props.modalState;
        
        const items = this.getItems()
        const noItem = items.length==0
        return <div>
            <div 
                className='app-bar'
            >
                    <img className='burger' src='/Hamburger_icon.png'/>
                    <img className={'edit-icon '+(noItem?'invisible':'invisible')} src='/edit.png'/>
                <div className='app-bar-text'>Today</div>
            </div>

            {items.map((item,idx)=>{
                return <div
                    className="item"
                    key={idx}
                >
                    <span className="dur">
                        {item.dur}
                        <div className="min">min</div>
                    </span>
                    {item.text}
                <span >{item.time}</span>
                </div>
            })}
            <div className="space"/>
            <button
                className='add_button'
                onClick={()=>{
                    setShowAddModal(true)
                    // focus on input_text and open keyboard
                    setTimeout(()=>{
                        document.getElementById("text_input").focus()
                    },100)

                }}
            >+</button>
            

            {/* pages */}

           <AddRecord
                addItem={(text, dur, end_time)=>this.addItem(text, dur, end_time)}
                deleteAll={()=>this.setState({
                    items:{
                        ...this.state.items,
                        [this.today()]:[]
                    }
                },true)}

                deleteLast={()=>{
                    const today = this.today()
                    this.setState({
                        items:{
                        ...this.state.items,
                        [today]:this.state.items[today].slice(0,-1)
                    }},true)
                }}
           />  

            <History 
                data={this.state.items}
            />

            <Menu/>
        
        </div>
    }
  }
  

export default withModalState(Home);