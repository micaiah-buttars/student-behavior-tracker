// used to grab data and map all students

import axios from 'axios'

const initialState = {
    students: [
        {
        student_id: 0,
        student_name: '',
        reminder_interval: 0,
        behaviors: [{
            behavior_name: '',
            behavior_desc: ''
          }]
        }
    ]
}

const REQUEST_ALL_STUDENTS = 'REQUEST_ALL_STUDENTS'

export const requestAllStudents = () => {
    let data = axios.get('/students').then(res => res.data)
        return {
            type: REQUEST_ALL_STUDENTS,
            payload: data
        }
}


export default function(state = initialState, action){
    switch(action.type){
        case REQUEST_ALL_STUDENTS + '_FULFILLED':
            return {...state, students: action.payload}
        default:
            return state
    }
}