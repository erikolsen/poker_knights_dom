import React from 'react'
import { API_ROOT, HEADERS } from '../constants'

class BetBar extends React.Component {
  constructor(props) {
    super(props);
    this.gameId = props.gameId
    this.handId = props.handId
    this.roundId = props.roundId
    this.player = ''
  }

  makeBet(bet){
    let player = localStorage.getItem('playerOne') || localStorage.getItem('playerTwo')
    fetch(`${API_ROOT}/games/${this.gameId}/hands/${this.handId}/rounds/${this.roundId}/bet`,{
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({'game': {'player' : player, 'bet': bet} } )
    });
  }

  makeCall(bet){
    let player = localStorage.getItem('playerOne') || localStorage.getItem('playerTwo')
    fetch(`${API_ROOT}/games/${this.gameId}/hands/${this.handId}/rounds/${this.roundId}/call`,{
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({'game': {'player' : player, 'bet': bet  } } )
    });
  }

  makeCheck(){
    if(this.props.pot === 0 && this.props.bets.length > 0){
      this.makeCall(0)
    } else {
      this.makeBet(0)
    }
  }

  foldHand(){
    let player = localStorage.getItem('playerOne') || localStorage.getItem('playerTwo')
    fetch(`${API_ROOT}/games/${this.gameId}/hands/${this.handId}/rounds/${this.roundId}/fold`,{
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({'player' : player } )
    });
  }

  render(){
    let hiddenClass = this.props.active ? '' : ' hidden'
    let betAction = this.props.pot > 0 ? 'Raise' : 'Bet'
    let canCheck = this.props.pot === 0
    let betAmount = this.props.pot > 0 ? 40 : 20
    return(
      <div className={hiddenClass}>
        <div className={'flex justify-between'}>
          <button onClick={()=>this.makeBet(betAmount)} className="w-1/3 p-4 border-2 text-3xl text-center">
            { betAction }
          </button>
          <button onClick={()=>this.makeCheck()} className="w-1/3 p-4 border-2 text-3xl text-center">
            Check
          </button>
          <button onClick={()=>this.makeCall(20)} className="w-1/3 p-4 border-2 text-3xl text-center">
            Call </button>
          <button onClick={()=>this.foldHand()} className="w-1/3 p-4 border-2 text-3xl text-center">
            Fold
          </button>
        </div>
      </div>
    )
  }
}

export default BetBar
