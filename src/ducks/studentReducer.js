// store info on single student, will be used in edit function

import axios from 'axios'

const initialState = {
        student_id: 0,
        student_name: '',
        reminder_interval: 0,
        behaviors: [{
            behavior_name: '',
            behavior_desc: ''
          }]
}


const REQUEST_STUDENT = 'REQUEST_STUDENT'
const HANDLE_CHANGE = 'HANDLE_CHANGE'

export const requestStudent = (id) => {
    let data = axios.get(`/student/${id}`).then(res => res.data)
        return {
            type: REQUEST_STUDENT,
            payload: data
        }
}

export const handleChange = (obj) => {
    return {
        type: HANDLE_CHANGE,
        payload: obj
    } 
}

export default function(state = initialState, action){
    switch(action.type){
        case REQUEST_STUDENT + '_FULFILLED':
                return {...state, ...action.payload[0]}
        case HANDLE_CHANGE:
            const {name, value, id} = action.payload
            const behaviors = [...state.behaviors]

            const found = state.behaviors.find(behavior => behavior.behavior_id === +id)
            const index = state.behaviors.findIndex(i => i.behavior_id === +id)

            const updated = {
                ...found,
                [name]: value || ''
            }
            behaviors.splice(index, 1, updated)

                return {...state, behaviors: [...behaviors]}
        default:
            return state
    }
}