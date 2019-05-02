// replacement for log reducer, will probably also bring in timeReducer

import axios from 'axios'

const initialState = {
    hour: 0,
    minutes: 0,
    behavior_id: 0,
    behavior_type_id: 0,
    log_comment: ''
}

const HANDLE_LOG_CHANGE = 'HANDLE_LOG_CHANGE'
const SUBMIT_LOG = 'SUBMIT_LOG'

export const submitLog = (log) => {
    console.log(log)
    const {id} = log
    let data = axios.post(`/log/${id}`, log).then(res => res.data)
        return {
            type: SUBMIT_LOG,
            payload: data
        }
}
export const handleLogChange = (obj) => {
    const {name, value} = obj
    const log = {
            [name]: value || ''
        }
    return {
        type: HANDLE_LOG_CHANGE,
        payload: log
    } 
}




export default function(state = initialState, action){
    switch(action.type){
        case HANDLE_LOG_CHANGE:
            return {...state, ...action.payload}
        case SUBMIT_LOG + '_FULFILLED':
            return {...initialState}
        default:
            return state
    }
}