import {configureStore} from "@reduxjs/toolkit";
import calendarReducer from './reducer';

export const store = configureStore({
    reducer: {
        calendar: calendarReducer,
    }
})
