import React, {useCallback, useState} from "react";
import Header from "../header/header";
import TextField from '@mui/material/TextField';
import "./regisration.css";
import Button from '@mui/material/Button';
import axios from 'axios';

import { yellow } from '@mui/material/colors';
import { styled } from '@mui/material/styles';


// import yellow from '@material-ui/core/colors/yellow'

function Register(){
    
    const [showPassword, setShowPassword] = useState(false);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(yellow[100]),
        backgroundColor: yellow[100],
        '&:hover': {
          backgroundColor: yellow[700],
        },
      }));
      
     
    
     
     
    const submitChackin = event => {
        if (email === ''){
            alert("Вы не ввели email")
        }else if (password ===''){
            alert("Вы не ввели password")
        }else if (password !==password2){
            alert("Ваши пароли не совпадают")
        }else{
            axios.post(`http://127.0.0.1:8000/auth/users/`, {
                        username: username,
                        email: email,
                        password: password,
                    })
                    .catch(function(error){
                        if (error.response.data.password){
                            alert(error.response.data.password)
                        }else if (error.response.data.username){
                            alert(error.response.data.username)
                        }
                    })


    }
}
    

    async function regisration(){
        const request = {
            // method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                
            },
            // body: JSON.stringify({username: username1, password: password1})
        }
        const body= JSON.stringify({username: username, password: password, email: email})
        const res = await axios.post(`http://127.0.0.1:8000/auth/users/`,body, request)
        .catch(function(error){
            if (error.response.data.password){
                alert(error.response.data.password)
            }else if (error.response.data.username){
                alert(error.response.data.username)
            }
        })

        };
         // fetch("http://127.0.0.1:8000/api/register/", request);
        
        //  if (res.data.success){
        //     console.log(res.data.success)
        //     authLinks()

        // }

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    // const success = yellow['A100'];
   
   


   
    return (
        <div >
            <Header/>
            <div className="registration">
                <div className="row">
                    <TextField label="Логин"  color="primary" focused onChange ={(event) => setUsername(event.target.value)} />
                </div>

                <div className="row">
                    <TextField label="Почта"  color="primary" focused onChange ={(event) => setEmail(event.target.value)} />
                </div>

                <div className="row">
                    <TextField label="Пароль" type="password" color="primary" focused onChange ={(event) => setPassword(event.target.value)}  /> 
               
                </div>

                <div className="row"> 
                <TextField label="Пароль" type="password" color="primary" focused onChange ={(event) => setPassword2(event.target.value)}  /> 
               
                </div>
                

                {/* <Button variant="contained" color= 'success' onClick={submitChackin}>
                    Зарегистрироваться
                </Button> */}
                <ColorButton variant="contained" onClick={submitChackin}>Зарегистрироваться</ColorButton>

                
            </div>
            

        </div>);
    }

export default Register;