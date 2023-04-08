import React from "react";
import MainCarousel from "./MainCarousel";
import ShoppingList from "./ShoppingList";
import Subcribe from "./Subcribe";

const Home = () => {
  return (
    <div className="home">
      <MainCarousel />
      <ShoppingList />
      <Subcribe />
    </div>
  );
};

export default Home;
