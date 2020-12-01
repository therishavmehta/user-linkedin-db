import {React, useState} from 'react';
import './App.css';
import {Nav} from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ThemeDisplay from './container/themeDisplay';
import {PageNotFound} from './components';

function App() {
  const [cards, setCards] = useState({
    forest: [],
    ocean: [],
    desert: [],
    home: []
  });

  const setCardAttribute = (param, value) => {
    setCards(otherProps => ({
      ...otherProps,
      [param]: [...otherProps[param], value]
    }))
  }

  const getAllCards = () => {
    return [...cards[App.THEME.desert], ...cards[App.THEME.forest], ...cards[App.THEME.ocean], ...cards[App.THEME.home]]
  }

  const getCategoryCard = (category) => {
    return [...cards[category], ...cards[App.THEME.home]]
  }

  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={
            () => (<ThemeDisplay category={App.THEME.home} cards={getAllCards()} appendCard={setCardAttribute}/>)} />
          <Route path="/forest/register" exact component={
            () => (<ThemeDisplay category={App.THEME.forest} cards={getCategoryCard(App.THEME.forest)} appendCard={setCardAttribute}/>)} />
          <Route path="/ocean/register" exact component={
            () => (<ThemeDisplay category={App.THEME.ocean} cards={getCategoryCard(App.THEME.ocean)} appendCard={setCardAttribute}/>)} />
          <Route path="/desert/register" exact component={
            () => (<ThemeDisplay category={App.THEME.desert} cards={getCategoryCard(App.THEME.desert)} appendCard={setCardAttribute}/>)} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

App.THEME = {
  home: 'home',
  forest: 'forest',
  ocean: 'ocean',
  desert: 'desert'
}

export default App;
