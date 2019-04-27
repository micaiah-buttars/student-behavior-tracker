import {createStore, applyMiddleware} from 'redux'
import {combineReducers} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import {composeWithDevTools} from 'redux-devtools-extension'
import studentsReducer from './ducks/studentsReducer'
import studentReducer from './ducks/studentReducer'
import behaviorReducer from './ducks/behaviorReducer'
import recordReducer from './ducks/recordReducer'
import newStudentReducer from './ducks/newStudentReducer'

const rootReducer = combineReducers({
    class: studentsReducer,
    student: studentReducer,
    behavior: behaviorReducer,
    logs: recordReducer,
    newStudent: newStudentReducer


})

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(promiseMiddleware)))