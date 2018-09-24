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
    let isPlayerOne = this.state.playerOne === localStorage.getItem('playerOne')
    let isPlayerTwo = this.state.playerTwo === localStorage.getItem('playerTwo')
    //console.log('Player One storage ' + localStorage.getItem('playerOne'))
    //console.log('Player One state ' + this.state.playerOne)
    //console.log(this.state.playerOne === localStorage.getItem('playerOne'))

    //console.log('Player Two storage ' + localStorage.getItem('playerTwo'))
    //console.log('Player Two state ' + this.state.playerTwo)
    //console.log(this.state.playerTwo === localStorage.getItem('playerTwo'))
    //let playersHand = isPlayerOne ? <Hand player={this.state.playerOne} cards={this.state.white} /> : <Hand player={this.state.playerTwo} cards={this.state.black} />
    //let opponent = isPlayerOne ? this.state.playerTwo : this.state.playerOne
    let playerOneHand = isPlayerOne ? <Hand player={this.state.playerOne} cards={this.state.white} /> : <h1 className='inline-block underline my-4' >{this.state.playerOne}</h1>
    let playerTwoHand = isPlayerTwo ? <Hand player={this.state.playerTwo} cards={this.state.black} /> : <h1 className='inline-block underline my-4' >{this.state.playerTwo}</h1>
    return (
      <div>
        <div>
          {playerTwoHand}
        </div>
        <div className='flex justify-center'>
          <Board white={this.state.white} black={this.state.black} gameId={this.gameId} handId={this.handId} roundId={this.roundId} cards={this.state.cards} knights={this.state.knights} />
        </div>
        <div className=''>
          { playerOneHand }
        </div>
      </div>
    );
  }
}

export default Game;
