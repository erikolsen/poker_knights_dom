import React from 'react'
import Square from './Square'
import BetBar from './BetBar'
import Hand from './Hand'
import _ from 'lodash'
import Draggable from 'react-draggable'

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
  //let width = Math.floor(window.outerWidth * 0.125)
  let width = SQUARE_SIZE
  let square = [row, col]
  if(_.isEqual(square, whiteKnights[0]) || _.isEqual(square, whiteKnights[1])) { //white knight
    return(
      <div>
        <Draggable onStop={(e,ui)=>{ moveKnight(ui)}} grid={[width, width]}>
          <div className="opacity-75 bg-orange-lighter text-black border-2 border-black rounded-full">&#9822;</div>
        </Draggable>
        <div>{getCard(cards, row, col)}</div>
      </div>
    )
  } else if(_.isEqual(square,blackKnights[0]) || _.isEqual(square, blackKnights[1])) { //black knight
      return(
        <div>
          <Draggable onStop={(e,ui)=>{ moveKnight(ui, true)}} grid={[width, width]}>
            <div style={{width: '50px'}} className="w-4 fixed opacity-75 bg-orange-darker text-white border-2 border-white rounded-full">&#9822;</div>
          </Draggable>
          <div>{getCard(cards, row, col)}</div>
        </div>
    )
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

const moveKnight = (ui, white) => {
  let color = white ? 'white' : 'black'
  console.log(white ? 'moved white' : 'moved black')
  let col = (ui.lastX / SQUARE_SIZE) + 1
  let row = white ? (ui.lastY / SQUARE_SIZE) + 8 : (ui.lastY / SQUARE_SIZE) + 1
  fetch(`${API_ROOT}/games/1/move`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({'game': {'color' : color, 'col': col, 'row': row } } )
  });
  console.log('col ' + col)
  console.log('row ' + row)
}

export default Board

