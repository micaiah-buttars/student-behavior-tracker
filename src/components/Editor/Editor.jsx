import React, {Component} from 'react'
import {Link, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {requestStudent, handleChange, updateBehavior, saveChanges} from '../../ducks/studentReducer'

import Nav from '../Nav/Nav'
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
        const {student_id, student_name, reminder_interval, behaviors} = this.props.student
        const student = {
            student_id,
            student_name,
            reminder_interval,
            behaviors
        }
        return (
            <div>
                <Nav 
                    backLink={'/settings'}
                    pageTitle={student_name}
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
                    path={`${this.props.match.path}/discouraged`}
                    render={(props) => <Discouraged {...props} student={student}
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
export default connect(mapState, {requestStudent, handleChange, updateBehavior, saveChanges})(Editor)

