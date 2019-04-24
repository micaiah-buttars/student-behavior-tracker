import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Discouraged extends Component{

    render(){
        console.log(this.props)
        const student = this.props.student
        const discouraged = student.behaviors
            .filter(behavior => behavior.behavior_type_id === 2)
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
            <div>DISCOURAGED</div>

            {discouraged}

            <Link to={`/editor/${this.props.match.params.id}/name`}> Prev</Link>
            <Link to={`/editor/${this.props.match.params.id}/replacement`}> Next</Link>

        </div>

    )
}
}

