import React, { Component } from 'react';
import BetBar from './BetBar'
import Hand from './Hand'
import Board from './Board'
import { API_ROOT } from '../constants'
import { ActionCable } from 'react-actioncable-provider';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';


if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

class App extends Component {
  targetElement = null;
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
  componentDidMount = () => {
    this.targetElement = document.querySelector('#board');
    disableBodyScroll(this.targetElement)
    console.log('mounting')
    fetch(`${API_ROOT}/games/${this.gameId}`)
      .then(res => res.json())
      .then(game => this.setState({ cards: game.cards,
                                    white: game.white.hand,
                                    black: game.black.hand,
                                    knights: game.knights,
      }))
      //.then(res => console.log(res))
  }
  componentWillUnmount(){
    clearAllBodyScrollLocks()
  }

  updateKnight(res) {
    console.log(res.move)
    console.log('cards ' + this.state.cards)
    this.setState({knights: res.move})
  }

  render() {
    let playersHand = this.player === 'black' ?
      <Hand player='Black' cards={this.state.black} /> :
      <Hand player='White' cards={this.state.white} />

    return (
      <div>
        <ActionCable
          channel={{ channel: 'MovesChannel', games: this.gameId }}
          onReceived={(res)=> this.updateKnight(res)}
        />

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

export default App;
