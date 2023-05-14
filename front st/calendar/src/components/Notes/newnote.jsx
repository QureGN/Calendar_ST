import React, {useEffect, useState, useCallback} from "react";
import Header from "../header/header";
import "./notes.css";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import 'dayjs/locale/ru'
import { yellow } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Autocomplete from '@mui/material/Autocomplete';
import { setSelectedDay, setMonth, setYear } from "../redux/reducer";
import {useSelector, useDispatch} from "react-redux";
import axios from 'axios';
import { deepPurple } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from "react-router";

function Notenew(){

  const options = ['Фиолетовый', 'Желтый'];
  const types = ['Задача', 'Мероприятие'];

  const dayselect = useSelector(state => state.calendar.date);
  const [notes, setNotes] = useState('');
  const [notation, setNotation] = useState('');
  const [color1, setColor1]= useState([])
  const [colorselected, setcolorselected]=useState([])
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [color, setColor] = useState(options[0]);
  const [typeselected, settypeselected]=useState([])
  const [type, setType] = useState([]);
  const [access, setAccess] = useState(localStorage.getItem('accessToken'))
  const [refresh, setRefresh] = useState(localStorage.getItem('refreshToken'))
  const navigate = useNavigate()
  const theme = createTheme({
    palette: {
      primary: {
        main: deepPurple[900],
      },
    },
  });

  const defaultProps={
    selectedDay: new Date (dayselect.selectedYear, dayselect.selectedMonth, dayselect.selectedDay)
  }
  
  const [datanote, setDataNote] = useState(dayjs(defaultProps.selectedDay));
  const [datanotion, setDataNotion] = useState(dayjs(defaultProps.selectedDay));
  const [datanotepost, setDataNotePost]=useState(new Date(defaultProps.selectedDay.getFullYear(), defaultProps.selectedDay.getMonth(), defaultProps.selectedDay.getDate()+1))

  useEffect(()=>{
    const apiUrl = 'http://127.0.0.1:8000/color/';
    axios.get(apiUrl).then((resp)=>{
      const allColor = resp.data.results;
      setColor1(allColor);

    })

    const apiUrl1 = 'http://127.0.0.1:8000/types/';
    axios.get(apiUrl1).then((resp)=>{
      const allType = resp.data.results;
      setType(allType);

    })

  },[])


  const Links= useCallback(() => {
    navigate('/week');
}, [navigate]
)


  const submithandleclick=()=>{
      
    axios.post(`http://127.0.0.1:8000/tasks/`, {
                        tname: notes,
                        descr: notation,
                        dateTask: datanote,
                        datenotif:datanotion,
                        color: colorselected.pk,
                        reminder: true,
                        type: typeselected.pk,
                        user: 1,
                        flag: true,
                    },
                    {headers: {'Authorization': `Bearer ${access}`}}
                    ).then(()=>{
                      Links()
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

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(yellow[100]),
    backgroundColor: yellow[100],
    '&:hover': {
    backgroundColor: yellow[700],
    },
  }));
  const color2 = "#311b92";

  return (
    <div>
      <Header/>

      {console.log(datanote)}
      <div className="wrap">

        <div className="row">

        
          <TextField label="Задача"   onChange ={(event) => setNotes(event.target.value)} />
        

        
        </div>

        <div className="row">

        
          <TextField label="Примечание"  onChange ={(event) => setNotation(event.target.value)} />
       
          
        </div>

        <div className="row">

        
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'} >
          
            <DateTimePicker
            label="Дата и время"
            value={dayjs(datanote)}
            // defaultValue={dayjs(defaultProps.selectedDay)}
            onChange={(newValue) => {setDataNote(newValue)}}
            
            />

          
          </LocalizationProvider>
        

        </div>

        <div className="row">
          

        
        <Autocomplete
            // value={colorselected.color || null}
            onChange={(event, newValue) => {
              setcolorselected(newValue);
            }}
            
            id="controllable-states-demo"
            options={color1}
            sx={{ width: 200 }}
            getOptionLabel={(color)=> color.color }
            InputProps={{ sx: { "& .MuiOutlinedInput-notchedOutline" :{ borderColor: color2 }}}}
            
            renderInput={(params) => <TextField {...params} label="Цвет"/>}
          />
       
        
          
          
         
        </div>

        <div className="row">
          
        
        <Autocomplete
            // value={colorselected.color || null}
            onChange={(event, newValue) => {
              settypeselected(newValue);
            }}
            
            id="controllable-states-demo"
            options={type}
            sx={{ width: 200 }}
            getOptionLabel={(color)=> color.type }
            
            renderInput={(params) => <TextField {...params} label="Тип" />}
          />
       
          
          
         
        </div>


        <div className="row">
                 
          <div>

         
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'} >
      
      <DateTimePicker
      label="Дата и время напоминания"
      value={dayjs(datanotion)}
    // defaultValue={dayjs(defaultProps.selectedDay)}
      onChange={(newValue) => setDataNotion(newValue)}
          
      />
    </LocalizationProvider>
        
            
          </div>
                 
        </div>


                

        <ColorButton variant="contained" onClick={submithandleclick}>Готово</ColorButton>

      </div>
            

          
        </div>
    );
}

export default Notenew;