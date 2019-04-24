import React, {Component} from 'react'
import {Link} from 'react-router-dom'


export default class Name extends Component{

    render(){
        console.log(this.props)
    return (
        <div>
            <div>NAME</div>

            <label>
                Name
                <input type='text'/>
            </label>
            <label>
                Reminder Interval
                <select>
                    <option>--SELECT--</option>
                </select>
            </label>
            <label>
                On Task Behavior
                <input type='text'/>
            </label>

            <Link to={`/editor/${this.props.match.params.id}/discouraged`}> Next</Link>

        </div>

    )
}
}