import React, {Component} from 'react'
import {Link} from 'react-router-dom'


export default class Replacement extends Component{

    handleChange = (e) => {
        const {name, value, id} = e.target
        this.props.handleChange({name, value, id})

    }

    render(){
        console.log(this.props)
        const student = this.props.student
        const replacement = student.behaviors
            .filter(behavior => behavior.behavior_type_id === 3)
            .map((behavior, i) => {
                return <div key={i} className='behaviorInput'>
                <label>  
                    <input 
                        className='behaviorName'
                        id={behavior.behavior_id}
                        name='behavior_name'
                        value={behavior.behavior_name}
                        placeholder='Behavior Name'
                        onChange={this.handleChange}
                        type='text'
                        />
                        <br/>
                    <input 
                        className='behaviorDesc'
                        id={behavior.behavior_id}
                        name='behavior_desc'
                        value={behavior.behavior_desc}
                        placeholder='Operational Definition'
                        onChange={this.handleChange}
                        type='text'
                        />
                </label>
                </div>
            })
    return (
        
        <div>
            <div>REPLACEMENT</div>

            {replacement}

            <Link to={`/editor/${this.props.match.params.id}/discouraged`}> Prev</Link>

        </div>

    )
}
}