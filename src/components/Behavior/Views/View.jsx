import React, {Component} from 'react'
import {connect} from 'react-redux'
import {requestStudent} from '../../../ducks/studentReducer'
import {requestLogs} from '../../../ducks/recordReducer'
import {Doughnut} from 'react-chartjs-2'
import {Line} from 'react-chartjs-2'


const moment = require('moment');


class View extends Component{
    constructor(props){
        super(props)
        this.state = {
            date: moment(),
            editing: true,
            selectedHour: '9'

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
    handleOptionChange = (e) => {
        const {value} = e.target
        console.log(value)
        this.setState({
            selectedHour: value
        })
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

        const reducer = (arr) => {
            let total = 0
            arr.forEach((log) => {
                if(log.behavior_type_id === 2){
                    total--
                } else if(log.behavior_type_id === 3){
                    total++
                } else {}
            })
            return total
        }

        const nine = reducer(logs.filter(function(log){
            return log.time_slot_id <= 9 && log.time_slot_id !== 0
        }))
        const ten = reducer(logs.filter(function(log){
            return log.time_slot_id >= 10 && log.time_slot_id <= 21
        }))
        const eleven = reducer(logs.filter(function(log){
            return log.time_slot_id >= 22 && log.time_slot_id <= 33
        }))
        const twelve = reducer(logs.filter(function(log){
            return log.time_slot_id >= 34 && log.time_slot_id <= 45
        }))
        const one = reducer(logs.filter(function(log){
            return log.time_slot_id >= 46 && log.time_slot_id <= 57
        }))
        const two = reducer(logs.filter(function(log){
            return log.time_slot_id >= 58 && log.time_slot_id <= 69
        }))
        const three = reducer(logs.filter(function(log){
            return log.time_slot_id >= 70
        }))
        
        const lineData = {
            labels: ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM'],
            datasets: [
                {
                    label: 'Net Behavior per Hour',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [nine, ten, eleven, twelve, one, two, three]

                }
            ]
        }
        
        const doughnutData = {
            labels: [
                'Target',
                'Replacement',
                'On Task',
                'No Entry'
            ],
            datasets: [{
                data: [target.length, replacement.length, onTask.length, noEntry.length],
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
        }
        


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

        const editor = logs.map((log, i) => {
            return <div key={i}>
                <span>{log.time_slot_id}</span>
                <select>
                    <option>--Select--</option>
                    {this.props.student.behaviors.map((behavior, i) => {
                        if(behavior.behavior_id === log.behavior_id){
                            return <option key={i}
                                selected
                                value={behavior.behavior_name}>{behavior.behavior_name}</option>
                        } else {
                            return <option key={i}
                                value={behavior.behavior_id}>{behavior.behavior_name}</option>
                        }
                    })}  
                </select>
                <input value={log.log_comment}/>



            </div>
        })

        const radioButtons = 
        <div>
            <input type='radio' value='9'
            checked={this.state.selectedHour === '9'}
            onChange={this.handleOptionChange}/>
            <input type='radio' value='10'
            checked={this.state.selectedHour === '10'}
            onChange={this.handleOptionChange}/>
            <input type='radio' value='11'
            checked={this.state.selectedHour === '11'}
            onChange={this.handleOptionChange}/>
            <input type='radio' value='12'
            checked={this.state.selectedHour === '12'}
            onChange={this.handleOptionChange}/>
            <input type='radio' value='1'
            checked={this.state.selectedHour === '1'}
            onChange={this.handleOptionChange}/>
            <input type='radio' value='2'
            checked={this.state.selectedHour === '2'}
            onChange={this.handleOptionChange}/>
            <input type='radio' value='3'
            checked={this.state.selectedHour === '3'}
            onChange={this.handleOptionChange}/>

        </div>


        


        return (
        <div>
            <div>
            <button onClick={this.previousDay}>PREVIOUS DAY</button>
            <h4>{`${this.state.date.format('LL')}`}</h4>
            <button onClick={this.nextDay}>NEXT DAY</button>
            </div>


            {/* <div className='dailyBarcode'>
                {dailyBarcode}
            </div> */}

            {!this.state.editing
                ? <div>
                <Line data={lineData}/>
                <Doughnut data={doughnutData}/>
                </div>
                : <div>
                    {radioButtons}
                    {(() => {
                    switch(this.state.selectedHour){
                        case '9':
                            return editor.filter(log => log.key <= 8)
                        case '10':
                            return editor.filter(log => log.key >= 9 && log.key <= 20)
                        case '11':
                            return editor.filter(log => log.key >= 21 && log.key <= 32)
                        case '12':
                            return editor.filter(log => log.key >= 33 && log.key <= 44)
                        case '1':
                            return editor.filter(log => log.key >= 45 && log.key <= 56)
                        case '2':
                            return editor.filter(log => log.key >= 57 && log.key <= 68)
                        case '3':
                            return editor.filter(log => log.key >= 69)
                        default:
                            return <div></div>

                    }
                })()}

                </div>
            
            }






    
        



        









        </div>


    )
    }
}

const mapState = (reduxState) => {
    return reduxState
}
export default connect(mapState, {requestStudent, requestLogs})(View)
