import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {requestAllStudents} from '../../ducks/studentsReducer'
 
class Settings extends Component {
    componentDidMount(){
        this.props.requestAllStudents()
    }

    
    render(){
        const students = this.props.class.students
        console.log(this.props)
        return (
            <div>
                <h1>Settings</h1>

                {students.map((student, i) => 
                    <div key={i}>
                        <Link to={`/editor/${student.student_id}/name`}>{student.student_name}</Link>
                    </div>

                )}










                <Link to='/'>TO DASHBOARD</Link>
                <br/>



            </div>
        )
    }
}

const mapState = (reduxState) => {
    return reduxState
}
export default connect(mapState, {requestAllStudents})(Settings)

