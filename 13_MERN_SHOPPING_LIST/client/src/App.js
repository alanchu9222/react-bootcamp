import React from "react";
import AppNavBar from "./components/AppNavBar";
import ItemModal from './components/ItemModal';
import ShoppingList from "./components/ShoppingList";
import { Container } from 'reactstrap';
import { Provider } from 'react-redux';
import "./App.css";
import store from './store';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Provider store={store}>    
    <div className="App">
      <AppNavBar />
      <Container>
      <ItemModal />
      <ShoppingList />
      </Container>
    </div>    
    </Provider>
  );
}

export default App;
