import React, {useCallback, useState} from "react";
import Header from "../header/header";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import "./auth.css"
import { yellow } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router";


// import yellow from '@material-ui/core/colors/yellow'

function Auth(){
    
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

    const [username, setUsername] = useState('');
    
    const [password, setPassword] = useState('');
    const [access, setAccess] = useState(localStorage.getItem('accessToken'))
    
    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(yellow[100]),
        backgroundColor: yellow[100],
        '&:hover': {
          backgroundColor: yellow[700],
        },
    }));

    const [register, setRegister] = useState(() => {
        return {
            username: "",
            email: "",
            password: "",
            password2: "",
        }
    })
     
    
    const Links= useCallback(() => {
        navigate('/');
    }, [navigate]
)

const infouser =(token)=>{

    
    const apiUrl = `http://127.0.0.1:8000/api/user`;
    axios.get(apiUrl, {headers: {'Authorization': `Bearer ${token}`}}).then((resp)=>{
    console.log(resp.data.data.pk)
    const allNote = resp.data.data;
    localStorage.setItem('user_id', allNote.pk)

})
}
     
    async function submitChackin () {
        if (username === ''){
            alert("Вы не ввели логин")
        }else if (password ===''){
            alert("Вы не ввели password")
        }else{
        const res = await axios.post(`http://127.0.0.1:8000/auth/jwt/create/`, {
                        username: username,
                        password: password,
                    })
                    .then((response) =>{
                        
                        let token = response.data.access
                        localStorage.setItem('refreshToken', response.data.refresh)
                        localStorage.setItem('accessToken', response.data.access)
                        console.log(token)
                        if (response.statusText=="OK"){
                            infouser(token)
                            Links()
                        }
                    })
                    .catch(function(error){
                        if (error.response.data){
                            alert("Неправильный логин или пароль")
                        }
                    })
                
                  
            
        }

        

        
    
    }
    

    return (
        <div >
            <Header/>
            <div className="authback">

                <div className="blur">  
                

                    <div className="child1"></div>
                    <div className="auth">
                        <div className="row">
                            <TextField label="Логин"  color="primary" focused onChange ={(event) => setUsername(event.target.value)} />
                        </div>

                    
                        <div className="row">
                            <TextField label="Пароль"  type= 'password' color="primary" focused onChange ={(event) => setPassword(event.target.value)} /> 
                    
                        </div>
                

                       
                        <ColorButton variant="contained" onClick={submitChackin}>Войти</ColorButton>

                    

                        
                    </div>
                </div>
                
               
                

            </div>

            
            

        </div>);
    }

export default Auth;