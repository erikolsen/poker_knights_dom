import React, { Component } from 'react';
import Square from './Square'
import Knight from './Knight'
import _ from 'lodash'
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../constants'
import { Hand } from 'pokersolver'
import { Link } from 'react-router-dom'
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
      knights: [],
    }
  }

  componentWillMount() {
    fetch(`${API_ROOT}/games/${this.gameId}/hands/${this.handId}/rounds/${this.roundId}`)
      .then(res => res.json())
      .then(game => this.setState({ knights: game.knights }))
      //.then(res => console.log(res))
  }

  updateKnight(res) {
    this.setState({knights: res.move})
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
  swapCard(card){
    _.replace(card, '♠', 's');
    _.replace(card, '♥', 'h');
    _.replace(card, '♣', 'c');
    _.replace(card, '♦', 'd');
    _.replace(card, '10', 'T');
    return card
  }


  getWinner(){
    if(!_.isEmpty(this.state.knights)){
      let cards = _.reverse(_.chunk(this.props.cards, 4))
      cards.push([])
      cards.unshift([])
      let playerOneRows = this.state.knights.slice(0,2).map((x)=> x[0])
      let playerTwoRows = this.state.knights.slice(2,4).map((x)=> x[0])
      //console.log('white rows ' + playerOneRows)
      //console.log('black rows ' + playerTwoRows)

      //console.log('whee ' + cards[playerOneRows[0]])
      //console.log('white hand ' + this.props.white)
      let whiteOneA = Hand.solve(_.concat(cards[playerOneRows[0]], this.props.white[0]).map((card)=> this.swapCard(card)))
      let whiteOneB = Hand.solve(_.concat(cards[playerOneRows[0]], this.props.white[1]).map((card)=> this.swapCard(card)))
      let whiteTwoA = Hand.solve(_.concat(cards[playerOneRows[1]], this.props.white[0]).map((card)=> this.swapCard(card)))
      let whiteTwoB = Hand.solve(_.concat(cards[playerOneRows[1]], this.props.white[1]).map((card)=> this.swapCard(card)))
      //let whiteHands = [whiteOneA]
      let whiteHands = Hand.winners([whiteOneA, whiteOneB, whiteTwoA, whiteTwoB])
      //console.log('White Best ' + whiteHands)

      let blackOneA = Hand.solve(_.concat(cards[playerTwoRows[0]], this.props.black[0]).map((card)=> this.swapCard(card)))
      let blackOneB = Hand.solve(_.concat(cards[playerTwoRows[0]], this.props.black[1]).map((card)=> this.swapCard(card)))
      let blackTwoA = Hand.solve(_.concat(cards[playerTwoRows[1]], this.props.black[0]).map((card)=> this.swapCard(card)))
      let blackTwoB = Hand.solve(_.concat(cards[playerTwoRows[1]], this.props.black[1]).map((card)=> this.swapCard(card)))
      let blackHands = Hand.winners([blackOneA, blackOneB, blackTwoA, blackTwoB])
      //console.log('Black best ' + blackHands)

      let hands = _.concat(whiteHands, blackHands)
      //console.log('Hands ' + hands)
      let winner = Hand.winners(hands)
      let whiteWins = _.includes(whiteHands, winner[0])
      //console.log('White Wins ' + _.includes(whiteHands, winner[0]))
      //console.log('Winner ' + winner)
      //console.log('Description ' + winner[0].descr)
      return whiteWins ? `White wins with ${winner[0].descr}` : `Black wins with ${winner[0].descr}`
    }
  }

  render(){
    //console.log('Game Over ' + gameOver(this.state.knights))
    //let winner = gameOver(this.state.knights) ? <WinnerLink gameId={this.gameId} handId={this.handId} winner={gameOver(this.state.knights)} /> : ''
    let winner = gameOver(this.state.knights) ? this.getWinner() : ''

    return (
      <div>
        <ActionCable
          channel={{ channel: 'MovesChannel', gameId: this.gameId, handId: this.handId, roundId: this.roundId }}
          onReceived={(res)=> this.updateKnight(res)}
        />

        <h1>{winner}</h1>
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

