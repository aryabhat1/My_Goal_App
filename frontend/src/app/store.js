import { configureStore } from "@reduxjs/toolkit"
// import counterReducer from '../features/counter/counterSlice';
import authSlice from "../features/auth/authSlice"
import goalReducer from "../features/goals/goalSlice"

export const store = configureStore({
    reducer: {
        // counter: counterReducer,
        auth: authSlice,
        goals: goalReducer,
    },
})
