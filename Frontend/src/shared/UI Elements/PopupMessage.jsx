import React, { useEffect, useState } from 'react';
import { Typography, Dialog, DialogContent  } from '@mui/material';

const PopupMessage = ({message, clearMessage}) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if(message){
            setOpen(true);
            setTimeout(() => {
                setOpen(false);
                clearMessage();
            }, 1000);
        }
    },[message, clearMessage]);

    return (
        <Dialog open={open}>
            <DialogContent sx={{backgroundColor: 'green', py: 1}}>
                <Typography variant='body1' sx={{color: 'white', textAlign: 'center'}}>{message}</Typography>
            </DialogContent>
        </Dialog>
    )
}

export default PopupMessage;
