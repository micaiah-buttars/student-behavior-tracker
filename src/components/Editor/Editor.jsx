import React, {Component} from 'react'
import {Link, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {requestStudent, handleChange} from '../../ducks/studentReducer'
import './Editor.css'

import Name from './Views/Name'
import Discouraged from './Views/Discouraged'
import Replacement from './Views/Replacement'


class Editor extends Component {
    componentDidMount(){
        const id = this.props.match.params.id
        this.props.requestStudent(id)
    }
 

    
    render(){
        console.log(this.props)
        const {student_id, student_name, reminder_interval, behaviors} = this.props.student
        const student = {
            student_id,
            student_name,
            reminder_interval,
            behaviors
        }
        console.log('STUDENT', student)
        return (
            <div>
                <h1>Editor</h1>
                <Link to='/settings'>X</Link>
                <br/>
                <Route 
                    path={`${this.props.match.path}/name`}
                    render={(props) => <Name {...props} student={student}
                    handleChange={this.props.handleChange}/>}
                />
                <Route 
                    path={`${this.props.match.path}/discouraged`}
                    render={(props) => <Discouraged {...props} student={student}/>}
                />

                <Route 
                    path={`${this.props.match.path}/replacement`}
                    render={(props) => <Replacement {...props} student={student}
                    handleChange={this.props.handleChange}/>}
                    />


            </div>
        )
    }
}

const mapState = (reduxState) => {
    return reduxState
}
export default connect(mapState, {requestStudent, handleChange})(Editor)

