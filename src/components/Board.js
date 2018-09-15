import React from 'react'
import Square from './Square'
import BetBar from './BetBar'
import Hand from './Hand'
import Knight from './Knight'
import _ from 'lodash'
//import { API_ROOT, HEADERS, SQUARE_SIZE } from './constants'

const API_ROOT = 'http://localhost:3000'
export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}
const SQUARE_SIZE = 50

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      white: [],
      black: [],
      whiteKnights: [],
      blackKnights: [],
    }
  }
  componentDidMount = () => {
    fetch(`${API_ROOT}/games/1`)
      .then(res => res.json())
      .then(game => this.setState({ cards: game.cards,
                                    white: game.white.hand,
                                    black: game.black.hand,
                                    whiteKnights: game.white.knights,
                                    blackKnights: game.black.knights,
      }))
      //.then(res => console.log(res))
  }

  render() {
    let cards = this.state.cards
    let blackKnights = this.state.blackKnights
    let whiteKnights = this.state.whiteKnights
    return (
      <div>
        <div className="flex flex-wrap justify-center max-w-iphone">
          {
            _.range(8).map((row,i)=>{
              return _.range(8).map((col,x)=>{
                return <Square key={x} row={row} col={col} card={getValue(row, col, cards, whiteKnights, blackKnights)} />
              })
            })
          }
        </div>

        <div className='flex justify-between'>
          <Hand player='White' cards={this.state.white} />
          <Hand player='Black' cards={this.state.black} />
        </div>

        <BetBar />
      </div>
    )
  }
}

const getValue = (row, col, cards, whiteKnights, blackKnights)=>{
  let square = [row, col]
  if(_.isEqual(square, whiteKnights[0]) || _.isEqual(square, whiteKnights[1])) {
    return( <Knight> { getCard(cards, row, col) } </Knight>)
  } else if(_.isEqual(square,blackKnights[0]) || _.isEqual(square, blackKnights[1])) {
    return( <Knight> { getCard(cards, row, col) } </Knight>)
  } else {
    return getCard(cards, row, col)
  }
}

const getCard = (cards, row, col)=>{
  if(row === 0) { return '' }
  if(row === 7) { return '' }

  if ( row % 2 === 0 ){
    return col % 2 === 0 ? cards.pop() : ''
  } else {
    return col % 2 === 0 ? '' : cards.pop()
  }
}


export default Board

