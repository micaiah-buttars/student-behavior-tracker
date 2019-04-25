import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {requestAllStudents} from '../../ducks/studentsReducer'
import './Dashboard.css'

import Nav from '../Nav/Nav'

class Dashboard extends Component {
    componentDidMount(){
        this.props.requestAllStudents()
    }


    render(){
        const students = this.props.class.students
        // console.log(this.props)
        return (
            <div>
                <Nav 
                    pageTitle={'Dashboard'}
                    buttonAction={() => this.props.history.push('/settings')}
                    buttonLabel={'Settings'}
                />
                <div className='studentCardContainer'>

                {students.map((student, i) => 
                    <div
                        key={i}
                        className='studentCard'
                        >
                        <Link to={`/student/${student.student_id}/send`}>{student.student_name}</Link>
                    </div>

                )}
                </div>

            </div>
        )
    }
}

const mapState = (reduxState) => {
    return reduxState
}
export default connect(mapState, {requestAllStudents})(Dashboard)