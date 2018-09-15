import React from 'react'
import _ from 'lodash'

const getCardColor = (card) =>{
  if(_.endsWith(card, '♠')){ return ' text-black'}
  if(_.endsWith(card, '♥')){ return ' text-red-dark'}
  if(_.endsWith(card, '♦')){ return ' text-blue-dark'}
  if(_.endsWith(card, '♣')){ return ' text-green-dark'}
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

export default Hand
