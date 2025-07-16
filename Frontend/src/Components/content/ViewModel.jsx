import React from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useSelector } from 'react-redux';

function Model({ url }) {
        const { scene } = useGLTF(url);
        return <primitive object={scene} />;
}

const ViewModel = ({Url}) => {
    const {models} = useSelector(state => state.modelDetails);
    const {modelId} = useParams();
    const modelUrl = modelId ? models.find(model => model.id === modelId).url : Url;
    
    return (
        <Box sx={{width: '100%', height: '100%',}}>
            <Canvas>
                <ambientLight intensity={7} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <Model url={modelUrl} />
                <OrbitControls /> 
            </Canvas>
        </Box>
    )
}

export default ViewModel;
