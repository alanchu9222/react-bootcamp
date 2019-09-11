import React from "react";
import AppNavBar from "./components/AppNavBar";
import ShoppingList from "./components/ShoppingList";
import { Provider } from 'react-redux';
import "./App.css";
import store from './store';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Provider store={store}>    
    <div className="App">
      <AppNavBar />
      <ShoppingList />
    </div>    
    </Provider>
  );
}

export default App;
