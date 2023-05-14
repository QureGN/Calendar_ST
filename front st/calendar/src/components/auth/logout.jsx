import React, {useCallback} from "react";

import Switch from '@mui/material/Switch';
import { useEffect } from "react";
import { useNavigate } from "react-router";


export function Logout(){

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
        Links()
    }


    return (
        <div>
           
           {logout()}
        </div>)
}

export default Logout;