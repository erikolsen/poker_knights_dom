import React, { Component } from 'react';
import BetBar from './BetBar'
import Hand from './Hand'
import Board from './Board'
import { API_ROOT } from '../constants'
var parsedUrl = new URL(window.location.href);
if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.url =  new URL(window.location.href)
    this.player = this.url.searchParams.get("player")
    this.state = {
      cards: [],
      white: [],
      black: [],
      knights: [],
    }
  }
  componentDidMount = () => {
    let gameId = this.url.pathname.split('/').last()
    console.log(gameId)
    fetch(`${API_ROOT}/games/${gameId}`)
      .then(res => res.json())
      .then(game => this.setState({ cards: game.cards,
                                    white: game.white.hand,
                                    black: game.black.hand,
                                    knights: game.knights,
      }))
      //.then(res => console.log(res))
  }

  render() {
    let playersHand = this.player === 'black' ?
      <Hand player='Black' cards={this.state.black} /> :
      <Hand player='White' cards={this.state.white} />

    return (
      <div>
        <header className="bg-black text-white h-12 text-2xl p-4 w-full mb-2">Poker Knights</header>
        <Board cards={this.state.cards} knights={this.state.knights} />

        { playersHand }

        <BetBar />
      </div>
    );
  }
}

export default App;
