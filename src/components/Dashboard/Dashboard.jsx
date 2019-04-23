import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Dashboard extends Component {
    render(){
        return (
            <div>
                <h1>Dashboard</h1>
                <Link to='/student/:id/send'>TO BEHAVIOR</Link>
                <Link to='/settings'>TO SETTINGS</Link>
            </div>
        )
    }
}