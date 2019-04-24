// replacement for log reducer, will probably also bring in timeReducer

// import axios from 'axios'

const initialState = {
}

const GET_TIME_SLOTS = 'GET_TIME_SLOTS'


// export const getTimeSlots = () => {
//     let data = axios.get('/times').then(res => res.data)
//         return {
//             type: GET_TIME_SLOTS,
//             payload: data
//         }
// }

export default function(state = initialState, action){
    switch(action.type){
        case GET_TIME_SLOTS + '_FULFILLED':
            return {...state, ...action.payload}
        default:
            return state
    }
}