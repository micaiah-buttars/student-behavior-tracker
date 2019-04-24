import {createStore, applyMiddleware} from 'redux'
import {combineReducers} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import {composeWithDevTools} from 'redux-devtools-extension'
import studentsReducer from './ducks/studentsReducer'
import studentReducer from './ducks/studentReducer'
import behaviorReducer from './ducks/behaviorReducer'


const rootReducer = combineReducers({
    class: studentsReducer,
    student: studentReducer,
    behavior: behaviorReducer


})

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(promiseMiddleware)))