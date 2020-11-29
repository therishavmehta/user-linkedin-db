import logo from './logo.svg';
import './App.css';
import {Nav} from './components';
import primaryColors from './colorUtility';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {ThemeDisplay} from './container';
import {PageNotFound} from './components';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={() => (<ThemeDisplay  bgColor={primaryColors.home}/>)} />
          <Route path="/forest/register" exact component={() => (<ThemeDisplay bgColor={primaryColors.forest} />)} />
          <Route path="/ocean/register" exact component={() => (<ThemeDisplay bgColor={primaryColors.ocean} />)} />
          <Route path="/desert/register" exact component={() => (<ThemeDisplay bgColor={primaryColors.desert} />)} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
