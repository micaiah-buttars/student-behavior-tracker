import React, {Component} from 'react'
import {connect} from 'react-redux'
import {requestStudent} from '../../../ducks/studentReducer'
import {handleLogChange, submitLog} from '../../../ducks/behaviorReducer'



class Send extends Component{
    constructor(props){
        super(props)
        this.state = {
            selectedOption: ''
        }
    }
    componentDidMount(){
        const id = this.props.match.params.id
        this.props.requestStudent(id)
    }
    handleOptionChange = (e) => {
        const {name, value} = e.target
        this.setState({
            selectedOption: value
        })
        this.props.handleLogChange({name, value})
    }
    handleLogChange = (e) => {
        const {name, value} = e.target
        this.props.handleLogChange({name, value})
    }
    handleSubmit = () => {
        const {student_id} = this.props.student
        const {behavior_id, behavior_type_id, hour, minutes, log_comment} = this.props.behavior
        const onTask = this.props.student.behaviors.filter(behavior => behavior.behavior_type_id === 1)
        const time = `${hour}:${minutes}`

        this.props.submitLog({
            student_id,
            behavior_id: behavior_id || onTask[0].behavior_id,
            behavior_type_id,
            time,
            log_comment
        })
    }

    render(){
        console.log(this.props)
        const {student_id, student_name, reminder_interval, behaviors} = this.props.student
        const student = {
            student_id,
            student_name,
            reminder_interval,
            behaviors
        }
        const discouraged = (behaviors || [''])
        .filter(behavior => behavior.behavior_type_id === 2)
        .map((behavior, i) => {
            return <option
                key={i}
                value={behavior.behavior_id}
                onChange={this.handleLogChange}>{behavior.behavior_name}</option>
        })
    const replacement = (behaviors || [''])
        .filter(behavior => behavior.behavior_type_id === 3)
        .map((behavior, i) => {
            return <option
                key={i}
                value={behavior.behavior_id}
                onChange={this.handleLogChange}>{behavior.behavior_name}</option>
        })
    return (
        <div>

            <div>SEND</div>
            <div className='behaviorReportContainer'>
                    <div className='radioButtons'>
                        <label>
                            <input type='radio' name='behavior_type_id' value='2'
                            checked={this.state.selectedOption === '2'}
                            onChange={this.handleOptionChange}/>
                            <span>Discouraged</span>
                        </label>

                        <label>
                            <input type='radio' name='behavior_type_id' value='1'
                            checked={this.state.selectedOption === '1'}
                            onChange={this.handleOptionChange}/>
                            <span>On Task</span>
                        </label>

                        <label>
                            <input type='radio' name='behavior_type_id' value='3'
                            checked={this.state.selectedOption === '3'}
                            onChange={this.handleOptionChange}/>
                            <span>Replacement</span>
                        </label>
                    </div>

                    {this.state.selectedOption === '2' ? (
                        <select
                            name='behavior_id'
                            onChange={this.handleLogChange}>
                            <option value='0'>- Select Behavior -</option>
                            {discouraged}
                        </select>
                        ) : this.state.selectedOption === '3' ? (
                        <select
                            name='behavior_id'
                            onChange={this.handleLogChange}>
                            <option value='0'>- Select Behavior -</option>
                            {replacement}
                        </select>
                        ) : <div></div>}

                        <div className='commentContainer'>
                            <input
                                className='commentBox'
                                type='text'
                                placeholder='comments'
                                name='log_comment'
                                value={this.props.behavior.log_comment}
                                onChange={this.handleLogChange}
                                />

            <select
                className='hourSelect'
                name='hour'
                onChange={this.handleLogChange}>
                <option>-- Hour --</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
            </select>
            :
            <select
                className='minutesSelect'
                name='minutes'
                onChange={this.handleLogChange}>
                <option>-- Minutes --</option>
                <option>00</option>
                <option>05</option>
                <option>10</option>
                <option>15</option>
                <option>20</option>
                <option>25</option>
                <option>30</option>
                <option>35</option>
                <option>40</option>
                <option>45</option>
                <option>50</option>
                <option>55</option>
            </select>
        </div>
        <button onClick={this.handleSubmit}>Submit</button>
        </div>
        </div>


    )
    }
}

const mapState = (reduxState) => {
    return reduxState
}
export default connect(mapState, {requestStudent, handleLogChange, submitLog})(Send)

