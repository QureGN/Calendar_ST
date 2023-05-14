import React, {useCallback, useState} from "react";
import "./week.css"
import Switch from '@mui/material/Switch';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router";
import { setDelete, setEditNote} from "../redux/reducer";
import { useDispatch } from "react-redux";
import axios from 'axios';
import { yellow } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export function NoteItem(props){
    

    const label = { inputProps: { 'aria-label': 'Color switch demo' } };
    const {note} = props;
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [flagsubmit, setFlag] = useState(note.flag)
    const access = localStorage.getItem('accessToken')

   

    const noteday= new Date(note.dateTask)
    const deleteClick=()=>{
        dispatch(setDelete(note.pk))
        const apiUrl = `http://127.0.0.1:8000/tasks/${note.pk}/`;
        axios.delete(apiUrl, {headers: {'Authorization': `Bearer ${access}`}})
    

        console.log('ok')
    }

    const EditNotes= useCallback(() => {
        dispatch(setEditNote(note))
        navigate('/editnote');
    }, [navigate]
)

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(yellow[100]),
    backgroundColor: yellow[100],
    '&:hover': {
    backgroundColor: yellow[700],
    },
  }));


  const Submutnotion=()=>{
    axios.put(`http://127.0.0.1:8000/tasks/${note.pk}/`, {
        tname: note.tname,
        descr: note.descr,
        dateTask: note.dateTask,
        datenotif:note.datenotif,
        color: note.color,
        reminder: true,
        type: note.type,
        user: 1,
        flag: true,
    },
    {headers: {'Authorization': `Bearer ${access}`}}
    ).then(()=>{
        dispatch(setFlag(true))
    })
    
  }
const error=(

    <ColorButton variant="contained" onClick={Submutnotion}>Повторная отправка уведомления</ColorButton>

    
 )


    return (
        <div>
            <div className="card">
                
                <h1>{noteday.getHours()}:{noteday.getMinutes()}</h1>
                <div>
                    <h1>{note.tname}</h1>
                    <p>{note.descr}</p>
                    <div> {flagsubmit ? true : error}</div>
                </div>
                <div className="column">
                    <div>
                        <Switch {...label}  color="default" onClick={deleteClick} />
                    </div>
                   
                   <div>
                    <EditIcon  sx={{ fontSize: 25 }} onClick={EditNotes}/>
                   </div>
                   
                        
                </div>
               
            </div>
        </div>)
}

export default NoteItem;