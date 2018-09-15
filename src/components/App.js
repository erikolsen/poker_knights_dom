import React, { Component } from 'react';
import BetBar from './BetBar'
import Hand from './Hand'
import Board from './Board'
import { API_ROOT } from '../constants'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      white: [],
      black: [],
      knights: [],
    }
  }
  componentDidMount = () => {
    fetch(`${API_ROOT}/games/1`)
      .then(res => res.json())
      .then(game => this.setState({ cards: game.cards,
                                    white: game.white.hand,
                                    black: game.black.hand,
                                    knights: game.knights,
      }))
      //.then(res => console.log(res))
  }

  render() {
    return (
      <div>
        <header className="bg-black text-white h-12 text-2xl p-4 w-full mb-2">Poker Knights</header>
        <Board cards={this.state.cards} knights={this.state.knights} />

        <div className='flex justify-between'>
          <Hand player='White' cards={this.state.white} />
          <Hand player='Black' cards={this.state.black} />
        </div>

        <BetBar />
      </div>
    );
  }
}

export default App;
