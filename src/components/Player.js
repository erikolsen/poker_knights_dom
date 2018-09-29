import React from 'react'
import Hand from './Hand'
import BetBar from './BetBar'

const CurrentPlayer = ({name, cards, stack, activeClass})=>{
  return(
    <div className='m-2'>
      <div className='flex justify-between'>
        <h1 className={'inline-block my-2' + activeClass}>{name}: ${stack}</h1>
        <Hand cards={cards} />
      </div>
    </div>
  )
}

const Opponent = ({name,stack, activeClass})=>{
  return(
    <div className='mr-2'>
      <h1 className={'inline-block mb-1' + activeClass}>{name}: ${stack}</h1>
    </div>
  )
}

const Player = ({name, cards, stack, active}) =>{
  let isPlayerOne  = localStorage.getItem('playerOne') === name
  let isPlayerTwo  = localStorage.getItem('playerTwo') === name
  let activeClass = active ? ' border border-green' : ''

  if (isPlayerOne || isPlayerTwo){
    return  <CurrentPlayer activeClass={activeClass} name={name} cards={cards} stack={stack} />
  } else {
    return  <Opponent activeClass={activeClass} name={name} stack={stack} />
  }
}

export default Player
