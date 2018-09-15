import React from 'react'
import Square from './Square'
import Knight from './Knight'
import _ from 'lodash'

const Board = ({cards, blackKnights, whiteKnights})=> {
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
    </div>
  )
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

