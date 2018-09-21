import React, { Component } from 'react'
import Game from './Game'
import Home from './Home'
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
          <Route path='/games/:gameId' component={Game}/>
          <Route exact path='/' component={Home}/>
        </Switch>
      </div>
    );
  }
}

export default App;
