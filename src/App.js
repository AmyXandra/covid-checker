import React from 'react';
// import {Router, Route} from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Landing from './components/Landing';
import Country from './components/Country';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/country/" component={Country}/>
          <Route path="/country/:country" component={Country} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
