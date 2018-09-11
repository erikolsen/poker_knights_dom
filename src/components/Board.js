import React from 'react';
import _ from 'lodash'
import Draggable from 'react-draggable'

const getCardColor = (cards) =>{
  if(_.endsWith(cards[cards.length-1], '♠')){ return ' text-black'}
  if(_.endsWith(cards[cards.length-1], '♥')){ return ' text-red-dark'}
  if(_.endsWith(cards[cards.length-1], '♦')){ return ' text-blue-dark'}
  if(_.endsWith(cards[cards.length-1], '♣')){ return ' text-green-dark'}
}

const getSquareColor = (row, col, cards)=>{
  if ( row % 2 === 0 ){
    return col % 2 === 0 ? ' bg-orange-lighter' + getCardColor(cards) : ' bg-orange-darker'
  } else {
    return col % 2 === 0 ? ' bg-orange-darker' : ' bg-orange-lighter' + getCardColor(cards)
  }
}

const getValue = (row, col, cards)=>{
  let width = Math.floor(window.outerWidth * 0.125)
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

const Square = ({row, col, cards})=>{
  let width = Math.floor(window.outerWidth * 0.125)
  let styles = {width: width, height: width}
  return(
    <div key={row + col} style={styles} className={'leading-loose text-center text-2xl' + getSquareColor(row, col, cards)} >
      <span className='z-20'>{getValue(row, col, cards)}</span>
    </div>
  )
}

const Board = ()=>{
  var suits = ['♠', '♥', '♦', '♣']
  var num = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
  let cards = _.shuffle(_.flatten(suits.map((s)=> num.map((n)=> n+s))))

  return (
    <div>
      <div className="flex flex-wrap justify-center">
        {
          _.range(8).map((row,i)=>{
            return _.range(8).map((col,x)=>{ return <Square row={row} col={col} cards={cards} /> })
          })
        }
      </div>

      <div className='inline-block border m-4 w-1/3 text-center'>
        <h1 className='underline my-4' >White</h1>
        <div className={getCardColor(cards) + ' inline-block h-12 w-12 border text-center text-2xl leading-loose m-2'}>
          {cards.pop()}
        </div>
        <div className={getCardColor(cards) + ' inline-block h-12 w-12 border text-center text-2xl leading-loose m-2'}>
          {cards.pop()}
        </div>
      </div>

      <div className='inline-block border m-4 w-1/3 text-center'>
        <h1 className='underline my-4' >Black</h1>
        <div className={getCardColor(cards) + ' inline-block h-12 w-12 border text-center text-2xl leading-loose m-2'}>
          {cards.pop()}
        </div>
        <div className={getCardColor(cards) + ' inline-block h-12 w-12 border text-center text-2xl leading-loose m-2'}>
          {cards.pop()}
        </div>
      </div>

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

    </div>
  )
}
export default Board

