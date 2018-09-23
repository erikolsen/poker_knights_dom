import React, { Component } from 'react';
import Hand from './Hand'
import Board from './Board'
import QS from 'query-string'
import { API_ROOT } from '../constants'

class Game extends Component {
  constructor(props) {
    super(props);
    this.gameId = props.match.params.gameId
    this.handId = props.match.params.handId
    this.roundId = props.match.params.roundId
    this.player = QS.parse(props.location.search).player
    this.state = {
      cards: [],
      white: [],
      black: [],
      knights: [],
    }
  }

  componentWillMount() {
    fetch(`${API_ROOT}/games/${this.gameId}/hands/${this.handId}/rounds/${this.roundId}`)
      .then(res => res.json())
      .then(game => this.setState({ cards: game.cards,
                                    white: game.white,
                                    black: game.black,
                                    knights: game.knights,
      }))
      //.then(res => console.log(res))
  }

  render() {
    console.log(localStorage.getItem('playerOne'))
    console.log('Cards ' + this.state.cards)
    let playersHand = this.player === 'black' ?
      <Hand player='Black' cards={this.state.black} /> :
      <Hand player='White' cards={this.state.white} />

    return (
      <div>
        <div>
          <Hand player='Black' cards={this.state.black} /> :
        </div>
        <div className='flex justify-center'>
          <Board gameId={this.gameId} handId={this.handId} roundId={this.roundId} cards={this.state.cards} knights={this.state.knights} />
        </div>
        <div className=''>
          <Hand player='White' cards={this.state.white} />
        </div>
      </div>
    );
  }
}

export default Game;
