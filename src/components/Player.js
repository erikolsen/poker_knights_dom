import React from 'react'
import Hand from './Hand'

const CurrentPlayer = ({name, cards})=>{
  return(
    <div>
      <h1 className='inline-block underline my-4'>{name}</h1>
      <Hand cards={cards} />
    </div>
  )
}

const Opponent = ({name})=>{
  return(
    <div>
      <h1 className='inline-block underline my-4'>{name}</h1>
    </div>
  )
}

const Player = ({name, cards}) =>{
  let isPlayerOne  = localStorage.getItem('playerOne') === name
  let isPlayerTwo  = localStorage.getItem('playerTwo') === name
  if (isPlayerOne || isPlayerTwo){
    return  <CurrentPlayer name={name} cards={cards} />
  } else {
    return  <Opponent name={name} />
  }
}

export default Player
