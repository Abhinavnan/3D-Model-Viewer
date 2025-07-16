import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Upload from './Components/content/Upload';
import Header from './Components/Header';
import ViewModel from './Components/content/ViewModel';
import View from './Components/content/View';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/view-model/:modelId" element={<ViewModel />} />
        <Route path="/view" element={<View />} />
        <Route path="*" element={<Upload />} />
      </Routes>
    </Router>
  )
}

export default App;

