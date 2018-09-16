import React from 'react'
import Square from './Square'
import Knight from './Knight'
import _ from 'lodash'

const Board = ({cards, knights})=> {
  return (
    <div>
      <div className="flex flex-wrap justify-center max-w-iphone min-w-iphone">
        {
          _.range(8).map((row,i)=>{
            return _.range(8).map((col,x)=>{
              return(<Square key={x}
                       row={row}
                       col={col}
                       card={getValue(row, col, cards, knights)}
                     />)
            })
          })
        }
      </div>
    </div>
  )
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

