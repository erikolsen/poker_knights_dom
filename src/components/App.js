import React, { Component } from 'react'
import Game from './Game'
import Home from './Home'
import Lobby from './Lobby'
import { Route, Switch, Link } from 'react-router-dom'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

class App extends Component {
  targetElement = null;
  componentDidMount = () => {
    this.targetElement = document.querySelector('#app');
    disableBodyScroll(this.targetElement)
  }
  componentWillUnmount(){
    clearAllBodyScrollLocks()
  }

  render() {
    return (
      <div id='app'>
        <header>
          <Link to='/'>
            <h1 className="bg-black text-white h-12 text-2xl p-4 w-full mb-2">
              Poker Knights
            </h1>
          </Link>
        </header>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/games/:gameId' component={Lobby}/>
          <Route path='/games/:gameId/hands/:handId/rounds/:roundId' component={Game}/>
        </Switch>
      </div>
    );
  }
}

export default App;
