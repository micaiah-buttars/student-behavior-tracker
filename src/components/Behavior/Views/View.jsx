import React, {Component} from 'react'
import {connect} from 'react-redux'
import {requestStudent} from '../../../ducks/studentReducer'
import {requestLogs} from '../../../ducks/recordReducer'
import {Doughnut} from 'react-chartjs-2'
import LogEdit from './LogEdit'

const moment = require('moment');


class View extends Component{
    constructor(props){
        super(props)
        this.state = {
            date: moment(),
            editing: false

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
    updateBehavior = (e) => {
        const {name, value, id} = e.target
        this.props.updateBehavior({name, value, id})

    }



    render(){
        const date = this.state.date.format().slice(0, 10)
        console.log('DATE', date)
        
        let logs = [...this.props.logs]
        let onTask = logs.filter(function(log){
            return log.behavior_type_id === 1
        })
        let target = logs.filter(function(log){
            return log.behavior_type_id === 2
        })
        let replacement = logs.filter(function(log){
            return log.behavior_type_id === 3
        })
        let noEntry = []
        
        let noEntryGenerator = () => {
            for (let i = 0; i < 76; i++){
                if(!(logs.find(log => {
                    return log.time_slot_id === (i + 1)
                }))){
                    logs.push({
                        student_id: this.props.match.params.id,
                        behavior_id: null,
                        behavior_type_id: null,
                        time_slot_id: (i + 1),
                        log_comment: null
                    })
                    noEntry.push('')


                }
            }
        }

        noEntryGenerator(logs)


        

        const behaviorData = [target.length, replacement.length, onTask.length, noEntry.length]

    
        const data = {
            labels: [
                'Target',
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
                        className='barcodeTarget'
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

            {!this.state.editing ? 
            <div className='doughnutContainer'>
            <Doughnut
            data={data}
            />
            </div> : 
            <LogEdit date={date} records={logs}/>
        }
        









        </div>


    )
    }
}

const mapState = (reduxState) => {
    return reduxState
}
export default connect(mapState, {requestStudent, requestLogs})(View)
