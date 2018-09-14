import React from 'react';
import _ from 'lodash'
import Draggable from 'react-draggable'

const SQUARE_SIZE = 50
const API_ROOT = 'http://localhost:3000'
export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}


const Square = ({row, col, card})=>{
  //let width = Math.floor(window.outerWidth * 0.125)
  let styles = {width: SQUARE_SIZE, height: SQUARE_SIZE}
  return(
    <div key={row + col} style={styles} className={'leading-loose text-center text-2xl' + getSquareColor(row, col)} >
      <span className={getCardColor(card)}>{card}</span>
    </div>
  )
}

const Hand = ({player,cards})=>{
  return(
    <div className='inline-block border m-4 w-1/3 text-center'>
      <h1 className='underline my-4' >{player}</h1>
      <div className={getCardColor(cards[0]) + ' inline-block h-12 w-12 border text-center text-2xl leading-loose m-2'}>
        {cards[0]}
      </div>
      <div className={getCardColor(cards[1]) + ' inline-block h-12 w-12 border text-center text-2xl leading-loose m-2'}>
        {cards[1]}
      </div>
    </div>
  )
}

const BetBar = ()=>{
  return(
    <div className='fixed pin-b flex w-full justify-between'>
      <button onClick={()=> window.location.reload()} className="border-2 h-24 w-1/3 text-3xl text-center">
        Bet
      </button>
      <button onClick={()=> window.location.reload()} className="border-2 h-24 w-1/3 text-3xl text-center">
        Call </button>
      <button onClick={()=> window.location.reload()} className="border-2 h-24 w-1/3 text-3xl text-center">
        Fold
      </button>
    </div>
  )
}

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

const getCardColor = (card) =>{
  if(_.endsWith(card, '♠')){ return ' text-black'}
  if(_.endsWith(card, '♥')){ return ' text-red-dark'}
  if(_.endsWith(card, '♦')){ return ' text-blue-dark'}
  if(_.endsWith(card, '♣')){ return ' text-green-dark'}
}

const getSquareColor = (row, col)=>{
  if ( row % 2 === 0 ){
    return col % 2 === 0 ? ' bg-orange-lighter' : ' bg-orange-darker'
  } else {
    return col % 2 === 0 ? ' bg-orange-darker' : ' bg-orange-lighter'
  }
}

export default Board

