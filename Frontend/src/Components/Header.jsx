import React from 'react';
import { Typography, Box, Button, AppBar, Toolbar, IconButton  } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import LogoWhite from '../assets/logo_white.png';

const ButtonArray = [
    {name: 'Upload', icon: <CloudUploadIcon sx={{fontSize: '2rem'}} />, link: '/'},
    {name: 'View', icon: <ViewInArIcon sx={{fontSize: '2rem'}} />, link: '/view'}
]

const Header = () => {
  return (
    <Box sx={{width: '100%', }}>
        <AppBar position="static">
            <Toolbar>
                <Box sx={{flexGrow: 1, display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 3}}>
                    <Box component="img" src={LogoWhite} alt='logo' sx={{ width: '2rem', height: '2rem'}} />
                    <Typography sx={{typography: {xs: 'h5', sm: 'h4'} }}>
                        3D Model Viewer
                    </Typography>
                </Box>
                {ButtonArray.map((button, index) => (
                    <IconButton key={index} href={button.link} sx={{color: 'inherit', '&:hover': {color: 'inherit'}, display: 'flex', 
                        alignItems: 'center', flexDirection: {xs: 'column', sm: 'row'}, gap: {xs: 0, sm: 1}}}>
                        {button.icon}
                        <Typography sx={{typography: {xs: 'caption', sm: 'h6'} }}>
                            {button.name}
                        </Typography>
                    </IconButton>
                ))}
            </Toolbar>
        </AppBar>
    </Box>
  )
}

export default Header;
