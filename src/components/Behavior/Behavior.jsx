import React, {Component} from 'react'
import {Link, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {requestStudent} from '../../ducks/studentReducer'
import './Behavior.css'


import View from './Views/View'
import Send from './Views/Send'
import Nav from '../Nav/Nav'
 
class Behavior extends Component {
    componentDidMount(){
        const id = this.props.match.params.id
        this.props.requestStudent(id)
    }

    
    render(){
        // console.log(this.props)
        const {student_id, student_name, reminder_interval, behaviors} = this.props.student
        const student = {
            student_id,
            student_name,
            reminder_interval,
            behaviors
        }
        console.log(student)
        return (
            <div>
                <Nav 
                    backLink={'/'}
                    pageTitle={student_name}
                    />
                <nav className='sendView'>
                <Link to={`${this.props.match.url}/send`}>
                    <div className=''>SEND</div>
                </Link>
                <Link to={`${this.props.match.url}/view`}>
                    <div>VIEW</div>
                </Link>
                </nav>

                <br/>
                <Route component={Send} path={`${this.props.match.path}/send`} />
                <Route component={View} path={`${this.props.match.path}/view`} />


            </div>
        )
    }
}

const mapState = (reduxState) => {
    return reduxState
}
export default connect(mapState, {requestStudent})(Behavior)
