import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Menu from './Menu';
import PizzaDetail from './PizzaDetail.jsx';
import Checkout from './Checkout.jsx';
import { AppProvider } from './AppProvider';
import { Navbar } from './Navbar';

const App =  () => {
  return(
    <BrowserRouter>
      <AppProvider>
        <Navbar/>
        <Switch>
          <Route path="/" component={ Menu } exact/>
          <Route path="/pizza/:id" component={ PizzaDetail } exact/>
          <Route path="/checkout" component={ Checkout } exact/>
        </Switch>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
