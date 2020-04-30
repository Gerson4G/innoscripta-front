import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Menu from './Menu';

const App =  () => {
  return(
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route path="/(.)*" component={ Menu } />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
