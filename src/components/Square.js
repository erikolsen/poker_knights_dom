import React from 'react'
import _ from 'lodash'
const SQUARE_SIZE = 50

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

const Square = ({row, col, card})=>{
  //let width = Math.floor(window.outerWidth * 0.125)
  let styles = {width: SQUARE_SIZE, height: SQUARE_SIZE}
  return(
    <div key={row + col} style={styles} className={'leading-loose text-center text-2xl' + getSquareColor(row, col)} >
      <span className={getCardColor(card)}>{card}</span>
    </div>
  )
}

export default Square
