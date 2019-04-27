import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleChange, updateBehavior, addStudent} from '../../ducks/newStudentReducer'


class New extends Component{

    handleChange = (e) => {
        const {name, value} = e.target
        this.props.handleChange({name, value})
    }

    updateBehavior = (e) => {
        const {name, value, id} = e.target
        this.props.updateBehavior({name, value, id})

    }

    handleSubmit = () => {
        const {student_name, reminder_interval, behaviors} = this.props.newStudent
        const student = {
            student_name,
            reminder_interval,
            behaviors
        }
        this.props.addStudent(student)
        this.props.history.push('/settings')
    }

    render(){
        console.log("recucer", this.props.newStudent)
        const newStudent = this.props.newStudent
        const onTask = newStudent.behaviors
            .filter(behavior => behavior.behavior_type_id === 1)
            .map((behavior, i) => {
                return <div key={i} className='behaviorInput'>
                <label> 
                    On Task Behavior
                        <br/>
                    <textarea 
                        className='behaviorDesc'
                        rows='3'
                        id={1}
                        value={behavior.behavior_desc || ''}
                        name='behavior_desc'
                        placeholder='Operational Definition'
                        onChange={this.updateBehavior}
                        type='text'
                        >
                        </textarea>
                </label>
                </div>
            })

            const discouraged = newStudent.behaviors
                .filter(behavior => behavior.behavior_type_id === 2)
                .map((behavior, i) => {
                    return <div key={i} className='behaviorInput'>
                    <label>  
                        <input 
                            className='behaviorName'
                            id={behavior.temp_id}
                            name='behavior_name'
                            value={behavior.behavior_name || ''}
                            placeholder='Discouraged Behavior Name'
                            onChange={this.updateBehavior}
                            type='text'
                            />
                            <br/>
                        <textarea 
                            className='behaviorDesc'
                            rows='3'
                            id={behavior.temp_id}
                            value={behavior.behavior_desc || ''}
                            name='behavior_desc'
                            placeholder='Operational Definition'
                            onChange={this.updateBehavior}
                            type='text'
                            >
                            </textarea>
                    </label>
                    </div>
                })

                const replacement = newStudent.behaviors
                .filter(behavior => behavior.behavior_type_id === 3)
                .map((behavior, i) => {
                    return <div key={i} className='behaviorInput'>
                    <label>  
                        <input 
                            className='behaviorName'
                            id={behavior.temp_id}
                            name='behavior_name'
                            value={behavior.behavior_name}
                            placeholder='Replacement Behavior Name'
                            onChange={this.updateBehavior}
                            type='text'
                            />
                            <br/>
                        <textarea 
                            className='behaviorDesc'
                            rows='3'
                            id={behavior.temp_id}
                            value={behavior.behavior_desc || ''}
                            name='behavior_desc'
                            placeholder='Operational Definition'
                            onChange={this.updateBehavior}
                            type='text'
                            >
                            
                            </textarea>
                    </label>
                    </div>
                })



    return (
        <div>
            <label>
                <input
                    placeholder='Student Name'
                    name='student_name'
                    value={newStudent.student_name}
                    type='text'
                    onChange={this.handleChange}/>
            </label>
            <label>
                <select
                className='reminderInterval'
                name='reminder_interval'
                value={newStudent.reminder_interval}
                onChange={this.handleChange}>
                    <option value=''>--Select--</option>
                    <option value='1'>5</option>
                    <option value='2'>10</option>
                    <option value='3'>15</option>
                    <option value='4'>30</option>
                    <option value='5'>60</option>
                </select>
            </label>

            {onTask}

            {discouraged}

            {replacement}

            <button onClick={this.handleSubmit}>Add Student</button>



        </div>

    )
}
}

const mapState = (reduxState) => {
    return reduxState
}
export default connect(mapState, {handleChange, updateBehavior, addStudent})(New)