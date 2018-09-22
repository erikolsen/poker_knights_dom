import React, { Component } from 'react';
import Square from './Square'
import Knight from './Knight'
import _ from 'lodash'
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../constants'
//const x = i % 8;
//const y = Math.floor(i / 8);
//const black = (x + y) % 2 === 1;

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

  render(){
    return (
      <div>
        <ActionCable
          channel={{ channel: 'MovesChannel', gameId: this.gameId, handId: this.handId, roundId: this.roundId }}
          onReceived={(res)=> this.updateKnight(res)}
        />

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

