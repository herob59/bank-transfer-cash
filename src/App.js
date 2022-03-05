import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import LinkPage from './components/LinkPage';
import Transaction from './components/Transaction';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (

      <Routes>
      <Route path="/" element={<Layout/>}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        
        <Route element = {<RequireAuth/>}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="transactions" element={<Transaction />} />
          <Route path="linkpage" element={<LinkPage />} />
        </Route>  

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
