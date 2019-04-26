import React, {Component} from 'react'
import {connect} from 'react-redux'
import {requestStudent} from '../../../ducks/studentReducer'
import {requestLogs} from '../../../ducks/recordReducer'
import {Doughnut} from 'react-chartjs-2'
const moment = require('moment');


class View extends Component{
    constructor(props){
        super(props)
        this.state = {
            date: moment()

        }
    }

    componentDidMount(){

        const id = this.props.match.params.id
        const date = this.state.date.format().slice(0, 10)

        this.props.requestStudent(id)
        this.props.requestLogs({id, date})
        
    }

    previousDay = () => {
        this.setState({
            date: this.state.date.subtract(1, 'day')
        })
        const id = this.props.match.params.id
        const date = this.state.date.format().slice(0, 10)
        this.props.requestLogs({id, date})


    }
    nextDay = () => {
        this.setState({
            date: this.state.date.add(1, 'day')
        })
        const id = this.props.match.params.id
        const date = this.state.date.format().slice(0, 10)
        this.props.requestLogs({id, date})
    }



    render(){
        console.log(this.props)
        const date = this.state.date.format().slice(0, 10)
        console.log('DATE', date)
        
        const logs = this.props.logs || ['']
        let onTask = logs.filter(function(log){
            return log.behavior_type_id === 1
        })
        let discouraged = logs.filter(function(log){
            return log.behavior_type_id === 2
        })
        let replacement = logs.filter(function(log){
            return log.behavior_type_id === 3
        })
        let noEntry = logs.filter(function(log){
            return log.behavior_type_id === null
        })
        const behaviorData = [discouraged.length, replacement.length, onTask.length, noEntry.length]

    
        const data = {
            labels: [
                'Discouraged',
                'Replacement',
                'On Task',
                'No Entry'
            ],
            datasets: [{
                data: behaviorData,
                backgroundColor: [
                '#E76B74',
                '#C3DD3E',
                '#E2EF70',
                '#EEE'
                ],
                hoverBackgroundColor: [
                '#E76B74',
                '#C3DD3E',
                '#E2EF70',
                '#EEE'
                ]
            }]
        };
        


        const dailyBarcode = logs.sort((a, b) => parseFloat(a.time_slot_id) - parseFloat(b.time_slot_id)).map((log, i) => {
            switch(log.behavior_type_id){
                case 1:
                    return <div 
                        className='barcodeOnTask'
                        key={i}
                        >'</div>
                case 2:
                    return <div
                        className='barcodeDiscouraged'
                        key={i}
                        >'</div>
                case 3:
                    return <div
                        className='barcodeReplacement'
                        key={i}
                        >'</div>
                default:
                    return <div
                        className='barcodeNoEntry'
                        key={i}
                        >'</div>
            }   
        })
        
        return (
        <div>
            <h4>{`${this.state.date.format('LL')}`}</h4>
            <div className='dailyBarcode'>
                {dailyBarcode}
            </div>

            <button onClick={this.previousDay}>PREVIOUS DAY</button>
            <button onClick={this.nextDay}>NEXT DAY</button>

            <div className='doughnutContainer'>
            <Doughnut
            data={data}
            />
            </div>









        </div>


    )
    }
}

const mapState = (reduxState) => {
    return reduxState
}
export default connect(mapState, {requestStudent, requestLogs})(View)
