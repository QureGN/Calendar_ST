import React, {useCallback, useState, useEffect} from "react";
import Switch from '@mui/material/Switch';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router";
import Header from "../header/header";
import "./notes.css";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/en-gb';
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
import { setSelectedDay, setMonth, setYear, setEditNote } from "../redux/reducer";
import {useSelector, useDispatch} from "react-redux";
import axios from 'axios';


export function EditNotes(){
    const noteselect = useSelector(state => state.calendar.editNotes);
    const [notes, setNotes] = useState('');
  const [notation, setNotation] = useState('');
  const [color1, setColor1]= useState([])
  const [colorselected, setcolorselected]=useState([])
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [datanote, setDataNote] = useState(dayjs(noteselect.dateTask));
  const [datanotion, setDataNotion] = useState(dayjs(noteselect.datenotif));
    const [typeedit, setedit] = useState([])
  const [typeselected, settypeselected]=useState([])
  const [type, setType] = useState([]);
    const navigate=useNavigate()
    const dispatch = useDispatch()


  
  const [access, setAccess] = useState(localStorage.getItem('accessToken'))
  const [refresh, setRefresh] = useState(localStorage.getItem('refreshToken'))
  
  useEffect(()=>{

    const apiUrl6 = `http://127.0.0.1:8000/tasks/${noteselect.pk}`;
    axios.get(apiUrl6, {headers: {'Authorization': `Bearer ${access}`}}).then((resp)=>{
      const allColor = resp.data;
      setNotes(allColor.tname);
      setNotation(allColor.descr);
      setDataNote(allColor.dateTask);
      setDataNotion(allColor.datenotif);

    })

    const apiUrl = 'http://127.0.0.1:8000/color/';
    axios.get(apiUrl).then((resp)=>{
      const allColor = resp.data.results;
      setColor1(allColor);

    })

    const apiUrl2 = `http://127.0.0.1:8000/color/${noteselect.color}`;
    axios.get(apiUrl2).then((resp)=>{
      const allColor = resp.data;
      setcolorselected(allColor);

    })

    const apiUrl1 = 'http://127.0.0.1:8000/types/';
    axios.get(apiUrl1).then((resp)=>{
      const allType = resp.data.results;
      setType(allType);

    })

    const apiUrl4 = `http://127.0.0.1:8000/types/${noteselect.type}`;
    axios.get(apiUrl4).then((resp)=>{
      const allType = resp.data;
      settypeselected(allType);

    })

  },[])
  const Link = useCallback(() => {
    dispatch(setEditNote([]))
    navigate('/week');
}, [navigate]);

  const submithandleclick=()=>{
      
    axios.put(`http://127.0.0.1:8000/tasks/${noteselect.pk}/`, {
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
                    )
                    .then(()=>{
                        Link()
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

    return (
        <div>
            <Header/>
            <div className="wrap">

        <div className="row">
          <TextField label="Задача"    value={notes}  onChange ={(event) => setNotes(event.target.value)}/>
        </div>

        <div className="row">

      
        <TextField label="Примечание" value={notation}   onChange ={(event) => setNotation(event.target.value)}/>
        
    
          {/* <TextField label="Примечание"  value={notation} onChange ={(event) => setNotation(event.target.value)} /> */}
        </div>

        <div className="row">


          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'} >
      
            <DateTimePicker
            label="Дата и время"
            value={dayjs(datanote)}
            // defaultValue={dayjs(defaultProps.selectedDay)}
             onChange={(newValue) => setDataNote(newValue)}
            />
          </LocalizationProvider>

        </div>

        <div className="row">
            {/* <TextField
            id="outlined-select-currency"
            select
            label={colorselected.color}
            //   value={colorselected.pk}
                sx={{ width: 200 }}
            onChange={(event, newValue) => {
                    setcolorselected(newValue); 
                }}
            >
            {color1.map((option) => (
                <MenuItem key={option.pk} value={option.pk}>
                {option.color}
                </MenuItem>
            ))}
            </TextField> */}
        
          <Autocomplete
            // value={'ok'}
            onChange={(event, newValue) => {
              setcolorselected(newValue); 
            }}
            
            id="controllable-states-demo"
            options={color1}
            sx={{ width: 200 }}
            getOptionLabel={(color)=> color.color }
            
            renderInput={(params) => <TextField {...params} label={colorselected.color}/>}
          />
          
         
        </div>

        <div className="row">

        {/* <TextField
            id="outlined-select-currency"
            select
            label={typeselected.type}
            sx={{ width: 200 }}
            onChange={(event, newValue) => {
                    setedit(newValue); 
                }}

            >
            {type.map((option) => (
                <MenuItem key={option.pk} value={option.pk}>
                {option.type}
                </MenuItem>
            ))}
            </TextField> */}


          <Autocomplete
            // value={colorselected }
            onChange={(event, newValue) => {
              settypeselected(newValue);
            }}
            
            id="controllable-states-demo"
            options={type}
            sx={{ width: 200 }}
            getOptionLabel={(color)=> color.type }
            
            renderInput={(params) => <TextField {...params} label={typeselected.type} />}
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
    )
}

export default EditNotes;