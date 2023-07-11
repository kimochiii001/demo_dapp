

import { Button, Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from "react";



export const MuiSnackbar = ({title,message, onClick, onSnackbar, checkOpen, checkClose}) =>{

    const [open, setOpen]= useState(false);
    // const [close, setClose]= useState(false);
    const [statusMessage, setStatusMessage] = useState(message);

   
    useEffect(() =>{
        // setOpen(checkOpen);
      
        // setOpen(checkOpen);
        console.log('check snakk '+ open);
        setStatusMessage(message);
       
    },)

    const handleClose =(event, reason) =>{
        if(reason == 'clickWay'){
            return;
        }
        setOpen(false);

    }
    return (

        <>
            <Button  onClick={onClick}
            >

        {title}
    </Button>
   

<Snackbar open={checkOpen} autoHideDuration={4000} onClose={checkClose}>
 { onSnackbar === true ? <Alert onClose={checkClose} severity="success" sx={{ width: '100%' }}>
    {statusMessage}
  </Alert> : <Alert onClose={checkClose} severity="error" sx={{ width: '100%' }}>
    {statusMessage}
  </Alert>}


  
</Snackbar>
    
    </>
    
    )
}