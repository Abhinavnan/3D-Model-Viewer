import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {PropagateLoader, PulseLoader} from "react-spinners";
import { Typography, Box, Button, IconButton  } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import DeleteIcon from '@mui/icons-material/Delete';
import { useHttp } from '../../shared/http-hook';
import { updateModelDetails } from '../../shared/Redux/modelDetailsSlice';
import PopupMessage from '../../shared/UI Elements/PopupMessage';
import ErrorBox from '../../shared/UI Elements/ErrorBox';

const View = () => {
    const dispatch = useDispatch();
    const {error, isLoading, sendRequest, clearError, message, clearMessage} = useHttp();
    const [modelList, setModelList] = useState([]);
    const [deleteId, setDeleteId] = useState('');
    const baseUrl = import.meta.env.VITE_BASE_URL;
    useEffect(() => {
        const fetchModels = async () => {
            try {
                const responseData = await sendRequest('get', `${baseUrl}/models`);
                setModelList(responseData.models);
                dispatch(updateModelDetails({models: responseData.models}));
            } catch (err) {
                console.log(err);
            }
        }
        fetchModels();
    }, []);

    const handleDelete = async (id) => {
        setDeleteId(id);
        try {
            await sendRequest('delete', `${baseUrl}/delete/${id}`);
            const updatedList = modelList.filter(model => model.id !== id);
            setModelList(updatedList);
            dispatch(updateModelDetails({models: updatedList}));
        } catch (err) {
            console.log(err);
        }
    }
    function normaliseName(name){
        const array = name.split('.');
        array.pop();
        const newName = array.join('.');
        return newName;
    }

    return (
        <Box sx={{width: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center'}}>
            <Typography variant="h4" sx={{my: 2}}>Models</Typography>
            {modelList.map((model) => (
                <Box key={model.id} sx={{width: {xs: '80%', md: '50rem'}, height: '3.5rem', display: 'flex', alignItems: 'center', 
                    flexDirection: 'row', gap: 2, borderRadius: 1, px: 2, backgroundColor: '#e3e3e3ff',}}>
                    <Typography variant="h6" sx={{flexGrow: 1, textAlign: 'left',}}>{normaliseName(model.name)}</Typography>
                    {isLoading && deleteId === model.id &&
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row', 
                            gap: 1, flexGrow: 1,}}>
                            <Typography variant="h6" sx={{ textAlign: 'left', width: '6rem',}}>Deleting</Typography>
                            <PulseLoader color="#606060ff" loading={isLoading} size={10} />
                        </Box>}
                    <IconButton href={model.url} download={model.name} 
                    sx={{color: 'inherit', '&:hover': {color: 'inherit'},
                        display: 'flex', alignItems: 'center', flexDirection: 'column',}}>
                        <DownloadIcon />
                        <Typography variant="caption">Download</Typography>
                    </IconButton>
                    <IconButton component={Link} to={`/view-model/${model.id}`} target="_blank"
                        sx={{color: 'inherit', '&:hover': {color: 'inherit'}, display: 'flex', alignItems: 'center', 
                        flexDirection: 'column',}}>
                        <ThreeDRotationIcon />
                        <Typography variant="caption">View</Typography>
                    </IconButton>
                    <IconButton onClick={() => handleDelete(model.id)} sx={{color: 'inherit', '&:hover': {color: 'inherit'}, 
                        display: 'flex', alignItems: 'center', flexDirection: 'column',}}>
                        <DeleteIcon />
                        <Typography variant="caption">Delete</Typography>
                    </IconButton>
                </Box>
            ))}
            <PropagateLoader color="#000000ff" loading={isLoading && deleteId !== ''} size={10} cssOverride={{margin: 'auto'}} />
            <ErrorBox clearError={clearError} error={error} />
            <PopupMessage message={message} clearMessage={clearMessage} />
        </Box>
    )
}

export default View;
