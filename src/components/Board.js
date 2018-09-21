import React, { Component } from 'react';
import Square from './Square'
import Knight from './Knight'
import _ from 'lodash'
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../constants'

class Board extends Component {
  constructor(props) {
    super(props);
    this.url =  new URL(window.location.href)
    this.gameId = this.url.pathname.split('/').last()
    this.player = this.url.searchParams.get("player")
    this.state = {
      knights: [],
    }
  }

  componentWillMount() {
    fetch(`${API_ROOT}/games/${this.gameId}`)
      .then(res => res.json())
      .then(game => this.setState({ knights: game.knights }))
      //.then(res => console.log(res))
  }

  updateKnight(res) {
    this.setState({knights: res.move})
  }

  render(){
    return (
      <div id='board'>
        <ActionCable
          channel={{ channel: 'MovesChannel', games: this.gameId }}
          onReceived={(res)=> this.updateKnight(res)}
        />

        <div className="flex flex-wrap justify-center max-w-iphone min-w-iphone">
          {
            _.range(8).map((row,i)=>{
              return _.range(8).map((col,x)=>{
                return(<Square key={x}
                         row={row}
                         col={col}
                         card={getValue(row, col, this.props.cards, this.state.knights)}
                       />)
              })
            })
          }
        </div>
      </div>
    )
  }
}

const getValue = (row, col, cards, knights)=>{
  let square = [row,col]
  let index = _.findIndex(knights, (pair)=>{ return _.isEqual(square, pair) } )

  if(index === 0 || index === 1) {
    return( <Knight white row={row} col={col} position={index}>{ getCard(cards, row, col) }</Knight>)
  } else if(index === 2 || index === 3) {
    return( <Knight black row={row} col={col} position={index}>{ getCard(cards, row, col) }</Knight>)
  } else {
    return getCard(cards, row, col)
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

