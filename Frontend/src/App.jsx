import React, { Suspense, lazy } from 'react';
import {GridLoader} from "react-spinners";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
const Upload = lazy(() => import('./Components/content/Upload'));
const Header = lazy(() => import('./Components/Header'));
const ViewModel = lazy(() => import('./Components/content/ViewModel'));
const View = lazy(() => import('./Components/content/View'));
import './App.css';

function App() {
  const loading = () => <GridLoader color="#6d6b6bff" 
        cssOverride={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} />
  return (
    <Suspense fallback={loading()}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Upload />} />
          <Route path="/view-model/:modelId" element={<ViewModel />} />
          <Route path="/view" element={<View />} />
          <Route path='*' element={<Upload />} />
        </Routes>
      </Router>
    </Suspense>
  )
}

export default App;
