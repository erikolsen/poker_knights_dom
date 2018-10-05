import React from 'react'
import { API_ROOT, HEADERS } from '../constants'

const makeBet = ({gameId, handId, roundId, bet}) =>{
  let player = localStorage.getItem('playerOne') || localStorage.getItem('playerTwo')
  fetch(`${API_ROOT}/games/${gameId}/hands/${handId}/rounds/${roundId}/bet`,{
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({'game': {'player' : player, 'bet': bet} } )
  });
}

const makeCall = ({gameId, handId, roundId, bet}) => {
  let player = localStorage.getItem('playerOne') || localStorage.getItem('playerTwo')
  fetch(`${API_ROOT}/games/${gameId}/hands/${handId}/rounds/${roundId}/call`,{
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({'game': {'player' : player, 'bet': bet  } } )
  });
}

const makeCheck = (props) => {
  if(props.pot === 0 && props.bets.length > 0){
    makeCall(props)
  } else {
    makeBet(props)
  }
}

const foldHand = ({gameId, handId, roundId}) => {
  let player = localStorage.getItem('playerOne') || localStorage.getItem('playerTwo')
  fetch(`${API_ROOT}/games/${gameId}/hands/${handId}/rounds/${roundId}/fold`,{
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({'player' : player } )
  });
}

const BetOrRaiseButton = (props) => {
  if(props.pot > 0){
    return <BarButton {...props} buttonType='Raise 20'  buttonAction={makeBet} bet={40} />
  } else {
    return <BarButton {...props} buttonType='Bet 20'  buttonAction={makeBet} bet={20} />
  }
}

const CheckOrCallButton = (props) => {
  if(props.pot === 0){
    return <BarButton {...props} buttonType='Check'  buttonAction={makeCheck} bet={0} />
  } else {
    return <BarButton {...props} buttonType='Call 20'  buttonAction={makeCall} bet={20} />
  }
}

const BarButton = (props) => {
  return(
    <button onClick={()=>props.buttonAction(props)} className="w-1/3 p-4 border-2 text-3xl text-center">
      { props.buttonType }
    </button>
  )
}

const BetBar = (props) => {
  return(
    <div>
      <div className={'flex justify-between'}>
        <BetOrRaiseButton {...props} />
        <CheckOrCallButton {...props} />
        <BarButton {...props} buttonType='Fold' buttonAction={foldHand} />
      </div>
    </div>
  )
}

export default BetBar
