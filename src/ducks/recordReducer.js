// new territory. this will grab student logs via ID and store them.

import axios from 'axios'

const initialState = [{
    log_id: 0,
    student_id: 0,
    behavior_id: 0,
    behavior_type_id: 0,
    time_slot_id: 0,
    log_comment: '',
    log_date: ''

}]

const REQUEST_LOGS = 'REQUEST_LOGS'

export const requestLogs = (id) => {
    let data = axios.get(`/log/${id}`).then(res => res.data)
        return {
            type: REQUEST_LOGS,
            payload: data
        }
}


// export const handleLogChange = (obj) => {
//     const {name, value} = obj
//     const log = {
//             [name]: value || ''
//         }
//     return {
//         type: HANDLE_LOG_CHANGE,
//         payload: log
//     } 
// }


export default function(state = initialState, action){
    switch(action.type){
        case REQUEST_LOGS + '_FULFILLED':
            return {...action.payload}
        default:
            return state
    }
}