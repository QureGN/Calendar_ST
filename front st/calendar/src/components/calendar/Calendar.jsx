import React, { useState, useCallback, useEffect} from "react";
import './calendar.css';
import * as calendar from './calendarhelp';
import classnames from 'classnames'
import Header from "../header/header";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { setSelectedDay, setMonthDays, setMonth, setYear, setFilter } from "../redux/reducer";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { setUser } from "../redux/reducer";


function Calendar() {


        const user_id1 = useSelector(state => state.calendar.user_id);
        const selectedDay = useSelector(state => state.calendar.calendarDays);    
        const [selectedDate, SetDay] = useState(null);
        const [date, setDate]=useState(new Date());
        const navigate = useNavigate();
        const dispatch = useDispatch();
        //let user_id=localStorage.getItem('user_id')
        const [user_id, setUser1] = useState('')

        const defaultProps = {
            // date: new Date(),
            years: [2022, 2023, 2024, 2025],
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            weekDayNames: ['Пн', 'Вт', 'Ср', 'Чт' , 'Пт', 'Сб', 'Вс'],
            onChange: Function.prototype
        }
      

        const monthdate = calendar.getMonthDate(date.getFullYear(), date.getMonth())

        const state = {
            // date: defaultProps.date,
            currentDate: new Date(),
            
        }

        const handleclickNextMonth=() =>{
            const datenew = new Date(date.getFullYear(), date.getMonth() + 1); 
            
            setDate(datenew)
            
        }

        const handleclickPrevMonth=() =>{
            const datenew = new Date(date.getFullYear(), date.getMonth() - 1); 
            
            setDate(datenew)
        }

        useEffect(()=>{
            setUser1(localStorage.getItem('user_id'))
        })
        
        const DAYS_IN_WEEK = 7;

        const handleclickDay = useCallback((date, count,user_id) => {
           
            if (user_id >0){
                
                
                dispatch(setSelectedDay({ selectedDay:date.getDate(),
                    selectedYear: date.getFullYear(),
                    selectedMonth: date.getMonth()
                }));
                // dispatch(setMonth(date.getMonth()));
                // dispatch(setYear(date.getFullYear()));
                dispatch(setFilter(date))
                dispatch(setMonthDays(count))
                navigate('/week');
            }
            // const weekd =[]
            // dispatch(setSelectedDay(date.getDate()));
            // dispatch(setMonth(date.getMonth()));
            // dispatch(setYear(date.getFullYear()));
            // dispatch(setFilter(date))
            // dispatch(setMonthDays(count))
            // navigate('/week');
        }, [navigate]);

        return (
            <div >
                
                <Header />

                <div className="calendar">
                    <div className="namedate">
                        <ArrowBackRoundedIcon  sx={{ fontSize: 50 }} onClick={handleclickPrevMonth} />
                        
                        <h1>{defaultProps.monthNames[date.getMonth()]} {date.getFullYear()}</h1>
                        
                        <ArrowForwardRoundedIcon sx={{ fontSize: 50 }} onClick={handleclickNextMonth} />


                    </div>

                    <div className="blur1">

                        <div className="child"> </div>
                        <table>
                            <thead>
                                <tr>
                                    {defaultProps.weekDayNames.map(name => 
                                        <th key ={name}>{name}</th>)}
                                </tr>

                            </thead>
                            <tbody>
                                {monthdate.map((week, index) =>
                                        <tr key={index} className="week">
                                            {week.map((date, index) => date ?
                                                <td
                                                key={index}
                                                className={classnames('day', {
                                                    'today': calendar.areEqual(date, state.currentDate),
                                                    'selected': calendar.areEqual(date, selectedDate)
                                                })}
                                                 onClick={() => handleclickDay(date, monthdate, user_id)}
                                            > {date.getDate()} </td>
                                                :
                                                <td key={index} />
                                            )}
                                        </tr> 
                                    )}
                            </tbody>


                        </table>

                    </div>
                    
                    

                    
                    

                </div>
                
            </div>

        );
}
export default Calendar;