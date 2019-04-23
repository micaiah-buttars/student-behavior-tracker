import {createStore, applyMiddleware} from 'redux'
import {combineReducers} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import {composeWithDevTools} from 'redux-devtools-extension'
import reducer from './ducks/reducer'


// const rootReducer = combineReducers({
//     studentData: studentDataReducer,
//     editStudent: editStudentReducer,
//     time: timeSlotReducer,
//     log: logReducer

// })

export default createStore(reducer, composeWithDevTools(applyMiddleware(promiseMiddleware)))