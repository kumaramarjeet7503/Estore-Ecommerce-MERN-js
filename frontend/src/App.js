import React from 'react';
import './App.css';
import Header from  './component/layout/Header/Header.js' ;
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './component/layout/Footer/Footer.js';
import Home from './component/Home/Home.js'
import ProductDetails from './component/Product/ProductDetails.js'


function App() {
  return (
  <Router>
    <Header />
      <Routes>
        <Route Component={Home} exact path='/' ></Route>
        <Route exact path="/product/:productId" Component={ProductDetails}  ></Route>
      </Routes>
    <Footer />
    </Router>
  );
}

export default App;
