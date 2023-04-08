import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/home/Home'
import ItemDetails from './pages/itemDetails/ItemDetails'
import Checkout from './pages/checkout/Checkout'
import Confirmation from "./pages/checkout/Confirmation";
import Navbar from "./components/Navbar"
import CartMenu from "./components/CardMenu"
import Footer from "./components/Footer";

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0,0)
  }, [pathname])

  return null;
}

function App() {
  return (
    <div className="app">
     <BrowserRouter>
     <Navbar/>
     <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="item/:itemId" element={<ItemDetails/>}/>
        <Route path="checkout" element={<Checkout/>}/>
        <Route path="checkout/success" element={<Confirmation/>}/>
      </Routes>
      <CartMenu/>
      <Footer/>
     </BrowserRouter> 
    </div>
  );
}

export default App;
