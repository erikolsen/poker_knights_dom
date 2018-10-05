import React, { Component } from 'react';
import Player from './Player'
import Hand from './Hand'
import Board from './Board'
import BetBar from './BetBar'
import QS from 'query-string'
import { API_ROOT } from '../constants'
import { ActionCable } from 'react-actioncable-provider';

class Game extends Component {
  constructor(props) {
    super(props);
    this.gameId = props.match.params.gameId
    this.handId = props.match.params.handId
    this.roundId = props.match.params.roundId
    this.player = QS.parse(props.location.search).player
    this.showBetBar = this.showBetBar.bind(this)
    this.state = {
      cards: [],
      white: [],
      black: [],
      knights: [],
      playerOne: '',
      playerOneStack: '',
      playerTwo: '',
      playerTwoStack: '',
      pot: '',
      bets: [],
      position: [],
      showWinner: false,
      showBetBar: false,
    }
  }

  componentWillMount() {
    fetch(`${API_ROOT}/games/${this.gameId}/hands/${this.handId}/rounds/${this.roundId}`)
      .then(res => res.json())
      .then(game => this.setState({ cards: game.cards,
                                    white: game.white,
                                    black: game.black,
                                    position: game.position,
                                    playerOne: game.playerOne,
                                    playerOneStack: game.playerOneStack,
                                    playerTwo: game.playerTwo,
                                    playerTwoStack: game.playerTwoStack,
                                    pot: game.pot,
                                    bets: game.bets,
                                    knights: game.knights,
      }))
      //.then(res => console.log(res))
  }

  updateBet(res){
    this.setState({bets: res.bets,
                  pot: res.pot,
                  showWinner: res.showWinner,
                  betting: res.betting,
                  showBetBar: res.showBetBar,
                  position: res.position,
                  playerOneStack: res.playerOneStack,
                  playerTwoStack: res.playerTwoStack
    })
  }

  showBetBar(){
    this.setState({showBetBar: true})
  }

  //componentDidUpdate(){
    //if(this.state.showWinner && this.state.showBetBar){
      //this.setState({showBetBar: false})
    //}
  //}

  playerOneTurn(){
    if(this.state.showBetBar){
      return this.state.bets.length % 2 === 0
    } else {
      if(!!this.state.showWinner) { return false }
      return this.state.position.length % 2 !== 0
    }
  }
  render() {
    let isPlayerOne = localStorage.getItem('playerOne')
    let isPlayerTwo = localStorage.getItem('playerTwo')
    let hiddenClass = ((this.playerOneTurn() && isPlayerOne) || (!this.playerOneTurn() && isPlayerTwo)) &&
      this.state.showBetBar &&
      !this.state.showWinner ? '' : ' hidden'

    return (
      <div>
        <ActionCable
          channel={{ channel: 'RoundsChannel', gameId: this.gameId, handId: this.handId, roundId: this.roundId }}
          onReceived={(res)=> this.updateBet(res)}
        />

        <div className='mx-2'>
          <Player active={!this.playerOneTurn()} name={this.state.playerTwo} cards={this.state.black} stack={this.state.playerTwoStack}/>
        </div>

        <div className='flex justify-center m-1'>
          <Board betting={this.state.showBetBar} showBetBar={this.showBetBar} showWinner={this.state.showWinner} white={this.state.white} black={this.state.black} gameId={this.gameId} handId={this.handId} roundId={this.roundId} cards={this.state.cards} knights={this.state.knights} />
        </div>

        <div className='mx-2 border-2 border-black text-center'>
          <h1>Pot: ${this.state.pot}</h1>
        </div>

        <div className='mx-2'>
          <Player active={this.playerOneTurn()} name={this.state.playerOne} cards={this.state.white} stack={this.state.playerOneStack} />
        </div>

        <div className={'pin-b fixed w-full' + hiddenClass}>
          <BetBar bets={this.state.bets} pot={this.state.pot} gameId={this.gameId} handId={this.handId} roundId={this.roundId} />
        </div>
      </div>
    );
  }
}

export default Game;
