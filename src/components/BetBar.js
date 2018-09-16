import React from 'react'

const BetBar = ()=>{
  return(
    <div className='fixed pin-b flex w-full justify-between'>
      <button onClick={()=> window.location.reload()} className="border-2 h-24 w-1/3 text-3xl text-center">
        Bet
      </button>
      <button onClick={()=> window.location.reload()} className="border-2 h-24 w-1/3 text-3xl text-center">
        Call </button>
      <button onClick={()=> window.location.reload()} className="border-2 h-24 w-1/3 text-3xl text-center">
        Raise </button>
      <button onClick={()=> window.location.reload()} className="border-2 h-24 w-1/3 text-3xl text-center">
        Fold
      </button>
    </div>
  )
}

export default BetBar
