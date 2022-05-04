import React from "react";
import './App.css'
import NavBar from './components/Navbar/NavBar'
import ItemListContainer from "./components/Items/ItemListContainer";
import ItemDetailContainer from "./components/Items/ItemDetailContainer";
import Cart from "./components/Cart/Cart";
import Footer from "./components/Footer/Footer";
import Page404 from "./components/Page404/Page404";
import Form from "./components/Form/Form";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartContextProvider from "./Context/CartContext";

export default function App() {
  return ( 
    <>
    <CartContextProvider>
    <BrowserRouter>
      <NavBar />
        <Routes>
          <Route exact path="/" element={<ItemListContainer/>}  />
          <Route exact path="/category/:categoryId" element={<ItemListContainer/>}  />
          <Route exact path="/item/:id" element={<ItemDetailContainer/>}/>
          <Route exact path="/cart" element={<Cart/>}/>
          <Route exact path="/form" element={<Form/>}/>
          <Route exact path="*" element={<Page404/>}/>
        </Routes>
      <Footer/>
    </BrowserRouter>
    </CartContextProvider>
    </>
  );
}