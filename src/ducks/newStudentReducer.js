// store info on single student, will be used in edit function

import axios from 'axios'

const initialState = {
        student_name: '',
        reminder_interval: 0,
        behaviors: [{
            temp_id: 1,
            behavior_type_id: 1,
            behavior_name: 'On Task Behavior',
            behavior_desc: ''
          },
          {
            temp_id: 2,
            behavior_type_id: 2,
            behavior_name: '',
            behavior_desc: ''
          },
          {
            temp_id: 3,
            behavior_type_id: 2,
            behavior_name: '',
            behavior_desc: ''
          },
          {
            temp_id: 4,
            behavior_type_id: 2,
            behavior_name: '',
            behavior_desc: ''
          },
          {
            temp_id: 5,
            behavior_type_id: 2,
            behavior_name: '',
            behavior_desc: ''
          },
          {
            temp_id: 6,
            behavior_type_id: 3,
            behavior_name: '',
            behavior_desc: ''
          },
          {
            temp_id: 7,
            behavior_type_id: 3,
            behavior_name: '',
            behavior_desc: ''
          },
          {
            temp_id: 8,
            behavior_type_id: 3,
            behavior_name: '',
            behavior_desc: ''
          },
          {
            temp_id: 9,
            behavior_type_id: 3,
            behavior_name: '',
            behavior_desc: ''
          }
        ]
}


const UPDATE_BEHAVIOR = 'UPDATE_BEHAVIOR'
const HANDLE_CHANGE = 'HANDLE_CHANGE'
const SAVE_CHANGES = 'SAVE_CHANGES'
const DESYNC = 'DESYNC'


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

export const addStudent = (student) => {
    axios.post('/student/new', student)
    return {
        type: SAVE_CHANGES,
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
        case UPDATE_BEHAVIOR:
            const {name, value, id} = action.payload
            const behaviors = [...state.behaviors]

            const found = state.behaviors.find(behavior => behavior.temp_id === +id)
            const index = state.behaviors.findIndex(i => i.temp_id === +id)

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
        case DESYNC:
            return {...initialState}
        default:
            return state
    }
}