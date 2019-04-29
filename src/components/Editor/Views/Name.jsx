import React, {Component} from 'react'
import {Link} from 'react-router-dom'


export default class Name extends Component{

    handleChange = (e) => {
        const {name, value} = e.target
        this.props.handleChange({name, value})
    }

    updateBehavior = (e) => {
        const {name, value, id} = e.target
        this.props.updateBehavior({name, value, id})

    }

    render(){
        console.log(this.props.student)
        const student = this.props.student
        const onTask = student.behaviors
            .filter(behavior => behavior.behavior_type_id === 1)
            .map((behavior, i) => {
                return <div key={i} className='behaviorInput'>
                <label> 
                    On Task Behavior
                        <br/>
                    <textarea 
                        className='behaviorDesc'
                        rows='3'
                        id={behavior.behavior_id}
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
                    value={student.student_name}
                    type='text'
                    onChange={this.handleChange}/>
            </label>
            <label>
                <select
                className='reminderInterval'
                name='reminder_interval'
                value={student.reminder_interval}
                onChange={this.handleChange}>
                    <option value=''>--Select--</option>
                    <option value='1'>5</option>
                    <option value='2'>10</option>
                    <option value='3'>15</option>
                    <option value='4'>30</option>
                    <option value='5'>60</option>
                </select>
            </label>

            {student.student_id ? onTask : 
            <div className='behaviorInput'>
            <label> 
                On Task Behavior
                    <br/>
                <textarea 
                    className='behaviorDesc'
                    rows='3'
                    id={0}
                    value={''}
                    name='behavior_desc'
                    placeholder='Operational Definition'
                    onChange={this.updateBehavior}
                    type='text'
                    >
                    </textarea>
            </label>
            </div>}

            <button className='settingsButton'>
            <Link to={`/editor/${this.props.match.params.id}/target`}> Next</Link>
            </button>



        </div>

    )
}
}