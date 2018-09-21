import React, { Component } from 'react';
import Hand from './Hand'
import Board from './Board'
import { API_ROOT } from '../constants'

      //knights: [[7,0], [7,7],[0,0],[0,7]],
class Game extends Component {
  constructor(props) {
    super(props);
    this.url =  new URL(window.location.href)
    this.gameId = this.url.pathname.split('/').last()
    this.player = this.url.searchParams.get("player")
    this.state = {
      cards: [],
      white: [],
      black: [],
      knights: [],
    }
  }

  componentWillMount() {
    fetch(`${API_ROOT}/games/${this.gameId}`)
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
        <div className='flex justify-center'>
          <Board cards={this.state.cards} knights={this.state.knights} />
        </div>
        <div className='flex justify-center'>
          { playersHand }
        </div>
      </div>
    );
  }
}

export default Game;
