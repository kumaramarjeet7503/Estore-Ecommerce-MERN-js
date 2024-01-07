import React from 'react';
import './App.css';
import Header from  './component/layout/Header/Header.js' ;
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './component/layout/Footer/Footer.js';
import Home from './component/Home/Home.js'
import ProductDetails from './component/Product/ProductDetails.js'
import Product from './component/Product/Product.js'
import Search from './component/Product/Search.js'


function App() {
  return (
  <Router>
    <Header />
      <Routes>
        <Route Component={Home} exact path='/' ></Route>
        <Route exact path="/product/:productId" Component={ProductDetails}  ></Route>
        <Route exact path="/products" Component={Product}  ></Route>
        <Route  path="/products/:keyword" Component={Product}  ></Route>
        <Route exact path="/search" Component={Search}  ></Route>
      </Routes>
    <Footer />
    </Router>
  );
}

export default App;
