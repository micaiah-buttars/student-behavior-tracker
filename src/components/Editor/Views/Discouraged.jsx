import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Discouraged extends Component{

    updateBehavior = (e) => {
        const {name, value, id} = e.target
        this.props.updateBehavior({name, value, id})

    }

    render(){
        // console.log(this.props)
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
                        onChange={this.updateBehavior}
                        type='text'
                        />
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
            <div>DISCOURAGED</div>

            {discouraged}

            <button className='settingsButton'>
            <Link to={`/editor/${this.props.match.params.id}/name`}> Prev</Link>
            </button>
            <button className='settingsButton'>
            <Link to={`/editor/${this.props.match.params.id}/replacement`}> Next</Link>
            </button>

        </div>

    )
}
}

