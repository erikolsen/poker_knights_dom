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
    <div className='mx-4'>
      <h1 className='inline-block underline my-4' >{player}</h1>
      <div className='inline-block'>
        <div className={getCardColor(cards[0]) + ' inline-block h-12 w-16 border text-center text-2xl leading-loose m-2'}>
          {cards[0]}
        </div>
        <div className={getCardColor(cards[1]) + ' inline-block h-12 w-16 border text-center text-2xl leading-loose m-2'}>
          {cards[1]}
        </div>
      </div>
    </div>
  )
}

export default Hand
