import React, {Component} from 'react'
import {Link, Route} from 'react-router-dom'
import View from './Views/View'
import Send from './Views/Send'
 
export default class Behavior extends Component {

    
    render(){
        console.log(this.props)
        return (
            <div>
                <h1>Behavior</h1>
                <Link to='/'>TO DASHBOARD</Link>
                <br/>
                <Link to={`${this.props.match.path}/view`}>VIEW</Link>
                <Link to={`${this.props.match.path}/send`}>SEND</Link>
                <br/>
                <Route component={View} path={`${this.props.match.path}/view`} />
                <Route component={Send} path={`${this.props.match.path}/send`} />


            </div>
        )
    }
}

