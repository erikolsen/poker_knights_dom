import React, { Component } from 'react';
import Player from './Player'
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
      playerOne: '',
      playerTwo: '',
    }
  }

  componentWillMount() {
    fetch(`${API_ROOT}/games/${this.gameId}/hands/${this.handId}/rounds/${this.roundId}`)
      .then(res => res.json())
      .then(game => this.setState({ cards: game.cards,
                                    white: game.white,
                                    black: game.black,
                                    playerOne: game.playerOne,
                                    playerTwo: game.playerTwo,
                                    knights: game.knights,
      }))
      //.then(res => console.log(res))
  }

  render() {
    return (
      <div>
        <div className='mx-2'>
          <Player name={this.state.playerTwo} cards={this.state.black} />
        </div>
        <div className='flex justify-center'>
          <Board white={this.state.white} black={this.state.black} gameId={this.gameId} handId={this.handId} roundId={this.roundId} cards={this.state.cards} knights={this.state.knights} />
        </div>
        <div className='mx-2'>
          <Player name={this.state.playerOne} cards={this.state.white} />
        </div>
      </div>
    );
  }
}

export default Game;
