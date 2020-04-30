import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Menu from './Menu';
import PizzaDetail from './PizzaDetail.jsx';

const App =  () => {
  return(
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route path="/" component={ Menu } exact/>
          <Route path="/pizza/:id" component={ PizzaDetail } exact/>
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
