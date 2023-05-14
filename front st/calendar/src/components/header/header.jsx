import React, {useState, useCallback, useEffect} from "react";
import rat from '../image/rat.svg';
import Menu from '../image/Menu.svg';
import Close from '../image/Close.svg';
import './header.css';
import { useNavigate } from "react-router";
import { setUser } from "../redux/reducer";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { indigo } from '@mui/material/colors';
import {useSelector, useDispatch} from "react-redux";
import { styled } from '@mui/material/styles';

import Button from '@mui/material/Button';


export function Header(){
    
    const user_id1 = useSelector(state => state.calendar.user_id);
    let [cartOpen, setCartOpen] = useState(false);
    const [nav, SetNav] = useState(true)
    const [user_id, setUser1] = useState('')
    const dispatch = useDispatch();


    const handleclick=()=>{
        setCartOpen(!cartOpen);
        SetNav(!nav)
    }

    
    const navigate = useNavigate()

    // const navigate = useNavigate();
    // const dispatch = useDispatch();

    // const handleClick = useCallback(() => {
    //     dispatch(setItemInPut(service));
    //     navigate('/formput');
    // }, [navigate]);

    const Links= useCallback(() => {
        navigate('/');
    }, [navigate]
)

    const logout=()=>{
        localStorage.setItem('accessToken', '')
        localStorage.setItem('refreshToken', '')
        localStorage.setItem('user_id', '')
        setUser('')
        Links()
    }
    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(indigo[100]),
        backgroundColor: indigo[100],
        '&:hover': {
        backgroundColor: indigo[100],
        },
      }));

    const auth=(
    //    <button onClick={logout}> Выйти</button>
    <div className="button">
        <ColorButton variant="contained" onClick={logout} >Выйти</ColorButton>
    </div>
       
        // <ul>
        //     <li>
        //         <a href="##" >Выйти</a>
        //     </li>
        // </ul>
    )

    const guest=(
        <ul>
            <li>
                <a href="auth">Войти</a>
            </li>
            <li>
                <a href="register">Зарегистрироваться</a>
            </li>
                            
        </ul>
    )

    useEffect(()=>{
        dispatch(setUser(localStorage.getItem('user_id')))
    })

    return (
        <header >
            <div className="icon">

                <div> <img height={50} src={rat} alt= "logo"/> </div> 
                
                <div className="menu" >

                    {nav ?  <MenuIcon  sx={{ fontSize: 50 }} onClick={() => handleclick()} />
                    //<img height={50} src={Menu} className="burger" alt ="menu" onClick={() => handleclick() }/> 
                    : false}
                    {cartOpen && (
                    <div className= "menu-card">
                    <CloseIcon  sx={{ fontSize: 40 }} onClick={() => handleclick()} />
                    
                        {user_id1> 0 ? auth : guest}
                        {/* <ul>
                            <li>
                                <a href="auth">Войти</a>
                                </li>
                            <li>
                                <a href="register">Зарегистрироваться</a>
                            </li>
                            <li>
                                <a href="##">Выйти</a>
                            </li>
                        </ul> */}
                        

                    </div>
                    )}

                </div>
                
            </div>
            
            
        </header>);
}

export default Header;