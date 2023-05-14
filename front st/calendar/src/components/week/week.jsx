import React, {useCallback, useEffect, useState} from "react";
import Header from "../header/header";
import * as week from "./weekhelp";
import {useSelector, useDispatch} from "react-redux";
import classnames from 'classnames'
import './week.css';
import* as calendar from "../calendar/calendarhelp"
import { setSelectedDay, setMonth, setYear, setFilter } from "../redux/reducer";
import add from "../image/add.svg"
import {useNavigate} from "react-router-dom";
import NoteItem from './NoteItem'
import axios from "axios";
import { setNote } from "../redux/reducer";
import { deepPurple } from '@mui/material/colors';
import Icon from '@mui/material/Icon';




function Week(){
    
    const taskonDay = useSelector(state => state.calendar.notesonDays)
    const dayselect = useSelector(state => state.calendar.date);
    const monthDays = useSelector(state => state.calendar.calendarDays);
    const filterday = useSelector(state => state.calendar.filterdate);
    const [filterSelect, setFilterselected] = useState(filterday);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [access, setAccess] = useState(localStorage.getItem('accessToken'))
    const [refresh, setRefresh] = useState(localStorage.getItem('refreshToken'))
    const [updateAccess, setUpdate] = useState(false)
    const [click, setClick] = useState(false)
    
    useEffect(()=>{

        getTasks(defaultProps.filter1, defaultProps.filter2);
        // const apiUrl = `http://127.0.0.1:8000/filter/?fromDate=${defaultProps.filter1}&&toDate=${defaultProps.filter2}`;
        // axios.get(apiUrl, {headers: {'Authorization': `Bearer ${access}`}}).then((resp)=>{
        //   const allNote = resp.data.results;
        //   dispatch(setNote(allNote));
    
        // }).catch(function(error){
        //     console.log(error.response.status)
        //     if (error.response.status === 401){
        //         setUpdate(true)
        //         console.log(updateAccess)
                
        //     }
 
        // })

        if (updateAccess){
             axios.post(`http://127.0.0.1:8000/auth/jwt/refresh/`, {
                        refresh: refresh,
                    })
                    .then((response) =>{
                        
                        localStorage.setItem('accessToken', response.data.access)
                        setUpdate(false)
                        
                    })
        }
    
       
    
      },[])


    const getTasks=(filter, filter2)=>{
        const apiUrl = `http://127.0.0.1:8000/filter/?fromDate=${filter}&&toDate=${filter2}`;
        axios.get(apiUrl, {headers: {'Authorization': `Bearer ${access}`}}).then((resp)=>{
          const allNote = resp.data.results;
          dispatch(setNote(allNote));
          setClick(false)
          
    
        }).catch(function(error){
            console.log(error.response.status)
            updatedAccess()


        })
        
    }

    const updatedAccess=()=>{
        axios.post(`http://127.0.0.1:8000/auth/jwt/refresh/`, {
                        refresh: refresh,
                    })
                    .then((response) =>{
                        
                        localStorage.setItem('accessToken', response.data.access)
                        setAccess(localStorage.getItem('accessToken'))               
                        
        })
                
    }
    
   

    const defaultProps = {
        selectedDayOfWeek: new Date (dayselect.selectedYear, dayselect.selectedMonth, dayselect.selectedDay),
        filter1: (new Date (dayselect.selectedYear, dayselect.selectedMonth, dayselect.selectedDay)).toISOString(),
        filter2: (new Date (dayselect.selectedYear, dayselect.selectedMonth, dayselect.selectedDay,23,59)).toISOString(),
        filtertata: (new Date(filterSelect.getFullYear(), filterSelect.getMonth(), filterSelect.getDate(), 3, 0)).toISOString(),
        fitlertata2: (new Date(filterSelect.getFullYear(), filterSelect.getMonth(), filterSelect.getDate(), 26, 59)).toISOString(),
        years: [2022, 2023, 2024, 2025],
        monthNames: ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
        weekDayNames: ['Пн', 'Вт', 'Ср', 'Чт' , 'Пт', 'Сб', 'Вс'],
        onChange: Function.prototype,
        

    }

    // const daysWeek = week.getWeekDays(dayselect.selectedDay, monthDays)
    // const weekNames = calendar.getDayOfWeek(dayselect.selectedDay)

    const daysWeek = week.getWeekDays(defaultProps.selectedDayOfWeek, monthDays)
    const weekNames = calendar.getDayOfWeek(defaultProps.selectedDayOfWeek)

    

    const handleclickDay = (day) => {
        dispatch(setFilter(day));
        dispatch(setSelectedDay({ selectedDay:day.getDate(),
            selectedYear: day.getFullYear(),
            selectedMonth: day.getMonth()
        }));
        // dispatch(setSelectedDay(day.getDate()));
        // dispatch(setMonth(day.getMonth()));
        // dispatch(setYear(day.getFullYear()));
        let filter1 = (new Date(day.getFullYear(), day.getMonth(), day.getDate())).toISOString()
        let filter2 = (new Date(day.getFullYear(), day.getMonth(), day.getDate(),23,59)).toISOString()
        
        getTasks(filter1, filter2);
          
    };

    

    const handleClickNewNote = useCallback(() => {
        
        navigate('/newNote');
    }, [navigate]);
    
    return (
        <div >
            <Header/>
            
           
           <h1 className="weekday">{defaultProps.weekDayNames[weekNames]},  {defaultProps.selectedDayOfWeek.getDate()} {defaultProps.monthNames[defaultProps.selectedDayOfWeek.getMonth()]}</h1>
           
            <div className="weekofday">
            <table>
                <thead>
                    <tr>
                        {defaultProps.weekDayNames.map(name => 
                            <th key ={name}>{name}</th>)}
                    </tr>

                </thead>
                <tbody>

                    <tr>
                        {daysWeek.map((day, index) => day ?
                        <td key ={index}
                        className={classnames('day', {
                            'today': week.areEqual(day, defaultProps.selectedDayOfWeek),
                            'selected': week.areEqual(day, defaultProps.selectedDayOfWeek)
                            
                        })}
                        onClick={() => handleclickDay(day)}
                        >
                            
                            {day.getDate()}

                        </td>
                        :
                        <td key={index}/>)}
                    </tr>

                </tbody>
            </table>

            <div className="cartNote">
                    {taskonDay.map(note => <NoteItem note = {note} key={note.pk} />
                    )}
            </div>
            <div className="add">
                <Icon className="add" sx={{ color: deepPurple[900], fontSize: 50 }} onClick={handleClickNewNote}>add_circle</Icon>
            
            </div>
            
           
        </div>
        
        
            
            
        </div>);
}

export default Week;