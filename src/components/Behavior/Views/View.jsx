import React, {Component} from 'react'
import {connect} from 'react-redux'
import {requestStudent} from '../../../ducks/studentReducer'
import {requestLogs} from '../../../ducks/recordReducer'

class View extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        const id = this.props.match.params.id
        this.props.requestStudent(id)
        this.props.requestLogs(id)
        
    }

    render(){
        console.log(this.props)
    return (
        <div>VIEW</div>

    )
    }
}

const mapState = (reduxState) => {
    return reduxState
}
export default connect(mapState, {requestStudent, requestLogs})(View)
