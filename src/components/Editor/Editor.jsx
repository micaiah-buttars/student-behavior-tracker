import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {requestStudent, handleChange, updateBehavior, saveChanges, deleteStudent} from '../../ducks/studentReducer'

import Nav from '../Nav/Nav'
import './Editor.css'

import Name from './Views/Name'
import Target from './Views/Target'
import Replacement from './Views/Replacement'


class Editor extends Component {
    componentDidMount(){
        const id = this.props.match.params.id
        this.props.requestStudent(id)
    }
 

    
    render(){
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
                    backLink={'/settings'}
                    pageTitle={student_name}
                    delete={() => this.props.deleteStudent(student)}
                    buttonAction={() => this.props.saveChanges(student)}
                    buttonLabel='SAVE'/>
            
                <br/>
                <Route 
                    path={`${this.props.match.path}/name`}
                    render={(props) => <Name {...props} student={student}
                    handleChange={this.props.handleChange}
                    updateBehavior={this.props.updateBehavior}
                    
                    />}
                />
                <Route 
                    path={`${this.props.match.path}/target`}
                    render={(props) => <Target {...props} student={student}
                    updateBehavior={this.props.updateBehavior}
                    />}
                />

                <Route 
                    path={`${this.props.match.path}/replacement`}
                    render={(props) => <Replacement {...props} student={student}
                    updateBehavior={this.props.updateBehavior}/>}
                    />


            </div>
        )
    }
}

const mapState = (reduxState) => {
    return reduxState
}
export default connect(mapState, {requestStudent, handleChange, updateBehavior, saveChanges, deleteStudent})(Editor)

