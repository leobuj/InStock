import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"

import Header from "./components/Header/Header"
import Footer from './components/Footer/Footer';
import LandingPage from './screens/LandingPage/LandingPage';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import TestStock from './screens/TestStock/TestStock';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path='/' component={LandingPage} exact/>
          <Route path='/teststock' component={() => <TestStock />}/>
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
