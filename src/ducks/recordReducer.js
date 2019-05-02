// new territory. this will grab student logs via ID and store them.

import axios from 'axios'

const initialState = {
    logs: [
        {    log_id: 0,
            student_id: 0,
            behavior_id: 0,
            behavior_type_id: 0,
            time_slot_id: 0,
            log_comment: '',
            log_date: ''
        }
    ],
    times: [
         '','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''
]


}


const REQUEST_LOGS = 'REQUEST_LOGS'
const REQUEST_TIMES = 'REQUEST_TIMES'
const HANDLE_LOG_UPDATE = 'HANDLE_LOG_UPDATE'



export const requestLogs = (params) => {
    const {id, date} = params
    let data = axios.get(`/log/${id}/view/${date}`).then(res => res.data)
        return {
            type: REQUEST_LOGS,
            payload: data
        }
}
export const requestTimes = () => {
    let data = axios.get('/times').then(res => res.data)
        return {
            type: REQUEST_TIMES,
            payload: data
        }
}
export const handleLogUpdate = (obj) => {
    return {
        type: HANDLE_LOG_UPDATE,
        payload: obj
    } 
}


export default function(state = initialState, action){
    switch(action.type){
        case REQUEST_LOGS + '_FULFILLED':
            console.log(state.times.length)
            return {...state, logs: action.payload}
        case REQUEST_TIMES + '_FULFILLED':
            return {...state, times: action.payload}
        case HANDLE_LOG_UPDATE:
            const {name, value, log_id} = action.payload
            const logs = [...state.logs]

            const found = logs.find(log => log.log_id === + log_id)
            const index = state.findIndex(log => log.log_id === + log_id)

            const updated = {
                    ...found,
                    [name]: value || ''
                }
            logs.splice(index, 1, updated)

                return {...state, ...logs}
        // case SYNC_LOGS:
        // return {...state, logs: action.payload}
        default:
            return state
    }
}