import React, { Component } from 'react';
import Square from './Square'
import Knight from './Knight'
import _ from 'lodash'
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT, HEADERS } from '../constants'
import HandCalculator from '../HandCalculator'
//const x = i % 8;
//const y = Math.floor(i / 8);
//const black = (x + y) % 2 === 1;

const gameOver = (positions)=>{
  let collection = _.uniq(positions.map((pos)=>{
                    return _.sum(pos) % 2 === 1
                  }))
  return collection.length === 1 && collection[0] === true
}

class Board extends Component {
  constructor(props) {
    super(props);
    this.gameId = props.gameId
    this.handId = props.handId
    this.roundId = props.roundId
    this.url =  new URL(window.location.href)
    this.player = this.url.searchParams.get("player")
    this.state = {
      allowNextHand: false,
      knights: [],
      nextHand: false,
      winner: '',
    }
  }

  componentWillMount() {
    fetch(`${API_ROOT}/games/${this.gameId}/hands/${this.handId}/rounds/${this.roundId}`)
      .then(res => res.json())
      .then(game => this.setState({ knights: game.knights }))
      //.then(res => console.log(res))
  }

  getValue(row, col){
    let square = [row,col]
    let index = _.findIndex(this.state.knights, (pair)=>{ return _.isEqual(square, pair) } )

    if(index === 0 || index === 1) {
      return( <Knight gameId={this.gameId} handId={this.handId} roundId={this.roundId} white row={row} col={col} position={index}>{ getCard(this.props.cards, row, col) }</Knight>)
    } else if(index === 2 || index === 3) {
      return( <Knight gameId={this.gameId} handId={this.handId} roundId={this.roundId} black row={row} col={col} position={index}>{ getCard(this.props.cards, row, col) }</Knight>)
    } else {
      return getCard(this.props.cards, row, col)
    }
  }

  getWinner(){
    if(!_.isEmpty(this.state.knights)){
      const calc = new HandCalculator(this.props.playerOne,
                                      this.props.playerTwo,
                                      this.props.cards,
                                      this.state.knights,
                                      this.props.white,
                                      this.props.black)

      this.postWinner(calc.winnerColor())
      this.setState({winner: calc.winnerMessage()})
    }
  }

  postWinner(color){
    // only post once
    if(!!localStorage.getItem('playerOne')){
      fetch(`${API_ROOT}/games/${this.gameId}/hands/${this.handId}/rounds/${this.roundId}/winner`,{
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({winner: color})
      });
    }
  }

  nextHand(){
    fetch(`${API_ROOT}/games/${this.gameId}/next_hand`,{
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({gameId: this.gameId})
    });
      //.then(game => this.setState({ knights: game.knights }))
  }

  updateKnight(res) {
    this.setState({knights: res.move})
  }

  startNextHand(res){
    this.setState({nextHand: parseInt(res.newHandSeq, 10)})
  }

  showBetBar(){
    this.props.showBetBar(true)
  }

  componentDidUpdate(){
    if(!this.props.betting && gameOver(this.state.knights) && !this.props.showWinner ){
      this.showBetBar()
    }

    if(!this.state.winner && this.props.showWinner){
      this.getWinner()
    }
  }

  render(){
    if(this.state.nextHand > this.handId){
      window.location = `/games/${this.gameId}/hands/${this.state.nextHand}/rounds/1`
    }
    let hiddenClass = this.state.winner ? '' : ' hidden'
    return (
      <div>
        <ActionCable
          channel={{ channel: 'MovesChannel', gameId: this.gameId, handId: this.handId, roundId: this.roundId }}
          onReceived={(res)=> this.updateKnight(res)}
        />

        <ActionCable
          channel={{ channel: 'HandsChannel', gameId: this.gameId, handId: this.handId, roundId: this.roundId }}
          onReceived={(res)=> this.startNextHand(res)}
        />

        <div className={'m-2' + hiddenClass}>
          <p className='text-2xl font-bold'>{this.state.winner}</p>
          <button className={'w-full border-2 border-indigo p-2 text-xl'} onClick={()=> {this.nextHand()}}>Next Hand</button>
        </div>

        <div id='board' className="flex flex-wrap justify-center max-w-iphone min-w-iphone">
          {
            _.range(8).map((row,i)=>{
              return _.range(8).map((col,x)=>{
                return(<Square key={x}
                         row={row}
                         col={col}
                         card={this.getValue(row, col)}
                       />)
              })
            })
          }
        </div>
      </div>
    )
  }
}

const takeACard = (cards)=>{
  let card = cards.pop()
  cards.unshift(card)
  return card
}

const getCard = (cards, row, col)=>{
  if(row === 0) { return '' }
  if(row === 7) { return '' }

  if ( row % 2 === 0 ){
    return col % 2 === 0 ? takeACard(cards) : ''
  } else {
    return col % 2 === 0 ? '' : takeACard(cards)
  }
}

export default Board

