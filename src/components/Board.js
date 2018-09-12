import React from 'react';
import _ from 'lodash'
import Draggable from 'react-draggable'

const SQUARE_SIZE = 50
const API_ROOT = 'http://localhost:3000'

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
      <div className={getCardColor(cards) + ' inline-block h-12 w-12 border text-center text-2xl leading-loose m-2'}>
        {cards.pop()}
      </div>
      <div className={getCardColor(cards) + ' inline-block h-12 w-12 border text-center text-2xl leading-loose m-2'}>
        {cards.pop()}
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
        Call
      </button>
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
    }
  }
  componentDidMount = () => {
    fetch(`${API_ROOT}/games/1`)
      .then(res => res.json())
      .then(cards => this.setState({ cards }))
  }

  render() {
    let cards = this.state.cards
    return (
      <div>
        <div className="flex flex-wrap justify-center max-w-iphone">
          {
            _.range(8).map((row,i)=>{
              return _.range(8).map((col,x)=>{
                return <Square row={row} col={col} card={getValue(row,col,cards)} />
              })
            })
          }
        </div>

        <div className='flex justify-between'>
          <Hand player='White' cards={cards} />
          <Hand player='Black' cards={cards} />
        </div>

        <BetBar />
      </div>
    )
  }
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

const getValue = (row, col, cards)=>{
  //let width = Math.floor(window.outerWidth * 0.125)
  let width = SQUARE_SIZE
  if(row === 0 && (col === 0 || col ===7)) {
    return <Draggable grid={[width, width]}><div className="opacity-75 bg-orange-lighter text-black border-2 border-black rounded-full">&#9822;</div></Draggable>
  } else if(row === 7 && (col === 0 || col ===7)) {
    return <Draggable grid={[width, width]}><div className="opacity-75 bg-orange-darker text-white border-2 border-white rounded-full">&#9822;</div></Draggable>
  } else {
    if(row === 0) { return '' }
    if(row === 7) { return '' }

    if ( row % 2 === 0 ){
      return col % 2 === 0 ? cards.pop() : ''
    } else {
      return col % 2 === 0 ? '' : cards.pop()
    }
  }
}

export default Board

