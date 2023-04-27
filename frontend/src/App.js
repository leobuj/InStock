import React, {useMemo} from 'react';
import {CssBaseline, ThemeProvider, createTheme} from "@mui/material";
import { BrowserRouter, Navigate, Routes, Route} from 'react-router-dom';
import {useSelector} from "react-redux";
import {themeSettings} from "./theme";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./scenes/layout/index";
import Dashboard from "./scenes/dashboard/index";


import Header from "./components/Header/Header"
import Footer from './components/Footer/Footer';
import LandingPage from './screens/LandingPage/LandingPage';
import FrontPage from './pages/FrontPage';
import TestStock from './screens/TestStock/TestStock';
import Orders from './screens/TestStock/Orders';
import Login from './screens/RegisLog/Login';
import Register from './screens/RegisLog/Register';



function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    /*<BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<LandingPage />}>

          </Route>
          <Route path='/frontpage' element={<FrontPage />}/>
          <Route path='/teststock' element={<TestStock />}/>
          <Route path='/order' element={<Orders />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>*/
    <div className="app">
      <BrowserRouter>
        <Header />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout/>}>
              <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
              <Route path="/dasboard" element={<Dashboard />}/>
              <Route path='/frontpage' element={<FrontPage />}/>
              <Route path='/teststock' element={<TestStock />}/>
              <Route path='/order' element={<Orders />}/>
              <Route path='/login' element={<Login />}/>
              <Route path='/register' element={<Register />}/>
            </Route>
          </Routes>
        </ThemeProvider>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
