import React from 'react';
import _ from 'lodash'

const Square = ()=>{
  let width = Math.floor(window.outerWidth * 0.125)
  let styles = {width: width, height: width}

  var suits = ['♠', '♥', '♦', '♣']
  var num = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
  let cards = _.shuffle(_.flatten(suits.map((s)=> num.map((n)=> n+s))))

  return (
    <div>
      return(
        <div className='flex justify-center'>
          <h1>Pot: 300</h1>
        </div>

        <div className='flex w-full m-6'>
          <div className='flex w-1/2'>
            <div className={'h-24 w-24 border-4 border-black text-center text-4xl leading-loose' + getColor(_,_,cards)}>
              {cards.pop()}
            </div>
            <div className={'h-24 w-24 border-4 border-black text-center text-4xl leading-loose' + getColor(_,_,cards)}>
              {cards.pop()}
            </div>
          </div>

          <div className='flex w-1/2 justify-center'>
            <div className='text-center'>
              <h1 >Bankroll</h1>
              <p className='text-3xl'>700</p>
            </div>
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
      )
    </div>
  )
}

export default Square

