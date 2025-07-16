import React, { useState } from 'react';
import { Typography, Box, Button  } from '@mui/material';
import {ClockLoader} from "react-spinners";
import { useHttp } from '../../shared/http-hook';
import ViewModel from './ViewModel';
import ErrorBox from '../../shared/UI Elements/ErrorBox';
import PopupMessage from '../../shared/UI Elements/PopupMessage';

function Upload() {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const smapleUrl = 'https://modelviewer.dev/shared-assets/models/Astronaut.glb';
    const [model, setModel] = useState(smapleUrl);
    const [file, setFile] = useState(null);
    const {error, isLoading, sendRequest, clearError, clearMessage, message} = useHttp();
    const handleInput = (event) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setModel(url);
        setFile(file);
    }

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('model', file);
        formData.append('name', file.name);
        const url = `${baseUrl}/upload`;
        try {
            sendRequest('post', url, formData);
            setModel(smapleUrl);
        } catch (err) {
            console.log(err);
        }
    }
    
    return (
        <Box sx={{width: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', 
            opacity: isLoading ? 0.5 : 1}}>
            <ErrorBox error={error} clearError={clearError} />
            <PopupMessage message={message} clearMessage={clearMessage} />
            <ClockLoader color="#5e5e5eff" loading={isLoading} size={50} 
                cssOverride={{position: 'absolute', top: '30%', left: '50%', zIndex: 1,}} />
            <Box sx={{width: '100%', height: '75%',}}>
                <ViewModel Url={model} />
            </Box>
            <Button variant="contained" component="label" disabled={isLoading}>
                Select 3D Model
                <input type="file" accept='.glb' hidden onChange={handleInput}/>
            </Button>
            { model !== smapleUrl && <Button variant="contained" color="success" onClick={handleUpload} disabled={isLoading}>Upload</Button>}
        </Box>
    );
}

export default Upload;
