import React, { Component } from 'react';
import Game from './Game'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

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
        <Game />
      </div>
    );
  }
}

export default App;
