import { createSlice} from "@reduxjs/toolkit";


const calendarSlice = createSlice({
    name:'calendar',
    initialState:{
        calendarDays:[],
        date: {
            selectedDay: null,
            selectedMonth: null,
            selectedYear:null
           
        },
        weekDays:[],
        notesonDays:[],
        filterdate:'',
        editNotes:[],
        user_id:'',
        
    },
    reducers: {
        setMonthDays: (state, action) => {
            state.calendarDays=action.payload
        },

        setSelectedDay: (state, action) => {
            state.date.selectedDay =  action.payload.selectedDay;
            state.date.selectedYear =  action.payload.selectedYear;
            state.date.selectedMonth =  action.payload.selectedMonth;

        },
        // setYear:(state,action) => {
        //     state.date.selectedYear = action.payload
        // },
        // setMonth:(state, action) => {
        //     state.date.selectedMonth = action.payload
        // },
        setWeek:(state, action) => {
            state.weekDays = action.payload
        },
        setNote:(state, action) => {
            state.notesonDays = action.payload
        },
        setFilter:(state, action) => {
            state.filterdate = action.payload
        },
        setEditNote:(state, action)=>{
            state.editNotes = action.payload
        },
        setDelete:(state, action)=>{
            state.notesonDays = state.notesonDays.filter(note => note.pk !== action.payload)
        },
        setUser:(state, action)=>{
            state.user_id = action.payload
        },

    }
}
);

export const {setMonthDays, setSelectedDay, setYear, setMonth, setWeek, setNote, setFilter, setEditNote, setDelete, setUser} = calendarSlice.actions;
export default calendarSlice.reducer;