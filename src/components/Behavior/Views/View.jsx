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
        let logs = this.props.logs || ['']
        // const onTask = [logs].filter(l => l.behavior_type_id === 1)

        console.log(logs)
        let onTask = 0
        let discouraged = 0
        let replacement = 0
        let noEntry = 0
        function tally(arr){
            for(let i = 0; i < arr.length; i++){
                console.log(arr[i])
            }

        }

        tally(logs)
        console.log(onTask)

        
        const data = {
            labels: [
                'Red',
                'Green',
                'Yellow'
            ],
            datasets: [{
                data: [300, 50, 100],
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ]
            }]
        };
    return (
        <div>
        <div>VIEW</div>
        <Doughnut data={data}/>




        </div>


    )
    }
}

const mapState = (reduxState) => {
    return reduxState
}
export default connect(mapState, {requestStudent, requestLogs})(View)
