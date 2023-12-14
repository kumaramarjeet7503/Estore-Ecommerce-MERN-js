import React from 'react';
import './App.css';
import Header from  './component/layout/Header/Header.js' ;
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './component/layout/Footer/Footer.js';


function App() {
  return (
  <Router>
    <Header />
    <Footer />
    </Router>
  );
}

export default App;
