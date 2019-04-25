import React, {Component} from 'react'
import {connect} from 'react-redux'
import {requestStudent} from '../../../ducks/studentReducer'
import {requestLogs} from '../../../ducks/recordReducer'
import {Doughnut} from 'react-chartjs-2'
import { arrayExpression } from '@babel/types';

class View extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        const id = this.props.match.params.id
        this.props.requestStudent(id)
        this.props.requestLogs(id)
        
    }



    render(){
        console.log(this.props)
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
        const behaviorData = [discouraged.length, replacement.length, onTask.length]

    
        const data = {
            labels: [
                'Discouraged',
                'Replacement',
                'On Task'
            ],
            datasets: [{
                data: behaviorData,
                backgroundColor: [
                '#E76B74',
                '#C3DD3E',
                '#E2EF70'
                ],
                hoverBackgroundColor: [
                '#E76B74',
                '#C3DD3E',
                '#E2EF70'
                ]
            }]
        };
    return (
        <div>
        <Doughnut
            data={data}
            height={250}
            options={{ maintainAspectRatio: false }}
            />




        </div>


    )
    }
}

const mapState = (reduxState) => {
    return reduxState
}
export default connect(mapState, {requestStudent, requestLogs})(View)
