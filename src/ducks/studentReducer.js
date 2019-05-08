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
const UPDATE_BEHAVIOR = 'UPDATE_BEHAVIOR'
const HANDLE_CHANGE = 'HANDLE_CHANGE'
const SAVE_CHANGES = 'SAVE_CHANGES'
const DELETE_STUDENT = 'DELETE_STUDENT'
const DESYNC = 'DESYNC'

export const requestStudent = (id) => {
    let data = axios.get(`/student/${id}`).then(res => res.data)
        return {
            type: REQUEST_STUDENT,
            payload: data
        }
}

export const handleChange = (obj) => {
    const {name, value} = obj
    const state = {
            [name]: value || ''
        }
    return {
        type: HANDLE_CHANGE,
        payload: state
    } 
}

export const updateBehavior = (obj) => {
    return {
        type: UPDATE_BEHAVIOR,
        payload: obj
    } 
}

export const saveChanges = (student) => {
    axios.put(`/editor/${student.student_id}`, student)
    return {
        type: SAVE_CHANGES,
        payload: {}
    }
}
export const deleteStudent = (student) => {
    axios.delete(`/editor/${student.student_id}`)
    return {
        type: DELETE_STUDENT,
        payload: {}
    }
}

export const desync = () => {
    return {
        type: DESYNC,
        payload: {}
    }
}

export default function(state = initialState, action){
    switch(action.type){
        case REQUEST_STUDENT + '_FULFILLED':
                return {...state, ...action.payload[0]}
        case UPDATE_BEHAVIOR:
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
        case HANDLE_CHANGE:
            return {...state, ...action.payload}
        case SAVE_CHANGES + '_FULFILLED':
            return {...state, ...initialState}
        case DELETE_STUDENT + '_FULFILLED':
            return {...state, ...initialState}
        case DESYNC:
            return {...initialState}
        default:
            return state
    }
}