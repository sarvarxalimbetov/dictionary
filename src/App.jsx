import React from "react";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <div className="container">
        <Header />
        <SearchForm />
      </div>
    </div>
  );
};

export default App;
