import React, {Component} from 'react'
import {Link, Route} from 'react-router-dom'
import Name from './Views/Name'
import Discouraged from './Views/Discouraged'
import Replacement from './Views/Replacement'
 
export default class Settings extends Component {

    
    render(){
        console.log(this.props)
        return (
            <div>
                <h1>Settings</h1>
                <Link to='/'>TO DASHBOARD</Link>
                <br/>
                <Link to={`${this.props.match.path}/name`}>NAME</Link>
                <Link to={`${this.props.match.path}/discouraged`}>DISCOURAGED</Link>
                <Link to={`${this.props.match.path}/replacement`}>REPLACEMENT</Link>
                <br/>
                <Route component={Name} path={`${this.props.match.path}/name`} />
                <Route component={Discouraged} path={`${this.props.match.path}/discouraged`} />
                <Route component={Replacement} path={`${this.props.match.path}/replacement`} />


            </div>
        )
    }
}

