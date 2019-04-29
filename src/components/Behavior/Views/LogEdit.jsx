import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleLogUpdate} from '../../../ducks/recordReducer'

class LogEdit extends Component{
    constructor(props){
        super(props)
        this.state = {
            records: [...this.props.records],
            hour: 9
        }
    }

    handleChange = (e) => {
        const {name, value, index} = e.target
        this.props.handleLogUpdate({name, value, index})
    }

    render(){
        console.log(this.props)
        let records = this.state.records

        const nine = records.filter(function(log){
            return log.time_slot_id <= 9 && log.time_slot_id !== 0
        })
        const ten = records.filter(function(log){
            return log.time_slot_id >= 10 && log.time_slot_id <= 21
        })
        const eleven = records.filter(function(log){
            return log.time_slot_id >= 22 && log.time_slot_id <= 33
        })
        const twelve = records.filter(function(log){
            return log.time_slot_id >= 34 && log.time_slot_id <= 45
        })
        const one = records.filter(function(log){
            return log.time_slot_id >= 46 && log.time_slot_id <= 57
        })
        const two = records.filter(function(log){
            return log.time_slot_id >= 58 && log.time_slot_id <= 69
        })
        const three = records.filter(function(log){
            return log.time_slot_id >= 70
        })


console.log(eleven)
        const mapper = (arr) => {
            arr.map((log, i) => {
                return <div>
                    
                </div>
            })

        }



        return(
            <div>
                {/* {(() => {
                    switch(this.state.hour){
                        case 9:
                            return {nine}
                        case 10:
                            return {ten}

                    }
                })()} */}
                
                
                
            </div>
        )
    }

}

const mapState = (reduxState) => {
    return reduxState
}
export default connect(mapState, {handleLogUpdate})(LogEdit)