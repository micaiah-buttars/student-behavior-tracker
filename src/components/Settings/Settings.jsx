import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {requestAllStudents} from '../../ducks/studentsReducer'
import {desync} from '../../ducks/studentReducer'

import Nav from '../Nav/Nav'
import Icon from '../Icon/Icon'
 
class Settings extends Component {
    componentDidMount(){
        this.props.requestAllStudents()
        this.props.desync()

    }

    
    render(){
        const students = this.props.class.students
        console.log(this.props)
        return (
            <div>
                <Nav 
                    pageTitle={'Settings'}
                    backLink={'/'}
                />

                <div className='studentCardContainer'>

                {students.map((student, i) => 
                <div
                    key={i} 
                    className='studentCard'>
                    <span className='studentName'>
                        {student.student_name}  
                    </span>
                    <Link to={`/editor/${student.student_id}/name`}>
                    <div className='editIcon'>
                        <Icon name='edit' fill="#FFF"/>
                    </div>


                    </Link>
                    

                </div>


                )}
                </div>

                <br/>
                <button>
                    <Link to={`/student/new`}>Add Student</Link>
                </button>



            </div>
        )
    }
}

const mapState = (reduxState) => {
    return reduxState
}
export default connect(mapState, {requestAllStudents, desync})(Settings)

