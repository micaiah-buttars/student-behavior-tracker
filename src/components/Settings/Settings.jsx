import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {requestAllStudents} from '../../ducks/studentsReducer'

import Nav from '../Nav/Nav'
 
class Settings extends Component {
    componentDidMount(){
        this.props.requestAllStudents()
    }

    
    render(){
        const students = this.props.class.students
        // console.log(this.props)
        return (
            <div>
                <Nav 
                    pageTitle={'Settings'}
                    backLink={'/'}
                />

                {students.map((student, i) => 
                    <div key={i}>
                        <Link to={`/editor/${student.student_id}/name`}>{student.student_name}</Link>
                    </div>

                )}
                <br/>



            </div>
        )
    }
}

const mapState = (reduxState) => {
    return reduxState
}
export default connect(mapState, {requestAllStudents})(Settings)

