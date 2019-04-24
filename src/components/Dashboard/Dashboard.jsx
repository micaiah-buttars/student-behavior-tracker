import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {requestAllStudents} from '../../ducks/studentsReducer'

class Dashboard extends Component {
    componentDidMount(){
        this.props.requestAllStudents()
    }


    render(){
        const students = this.props.class.students
        console.log(this.props)
        return (
            <div>
                <h1>Dashboard</h1>

                {students.map((student, i) => 
                    <div key={i}>
                        <Link to={`/student/${student.student_id}/send`}>{student.student_name}</Link>
                    </div>

                )}
                <Link to='/settings'>TO SETTINGS</Link>
            </div>
        )
    }
}

const mapState = (reduxState) => {
    return reduxState
}
export default connect(mapState, {requestAllStudents})(Dashboard)