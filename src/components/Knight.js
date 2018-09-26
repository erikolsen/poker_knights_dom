import React from 'react'
import Draggable from 'react-draggable'
import { API_ROOT, HEADERS, SQUARE_SIZE } from '../constants'
const canMoveKnight = (toX, toY) => {
  return (Math.abs(toX) === SQUARE_SIZE*2 && Math.abs(toY) === SQUARE_SIZE) ||
         (Math.abs(toX) === SQUARE_SIZE && Math.abs(toY) === SQUARE_SIZE*2);
}

const Knight = ({gameId, handId, roundId, children, white, black, position, row, col})=>{
  let colors = white ? ' text-white border-white bg-orange-darker' :
                       ' text-black border-black bg-orange-lighter'

  let classes = "fixed border-2 rounded-full text-2lg" + colors
  return(
    <div>
      <Draggable onStop={(e,ui)=>{ moveKnight(gameId, handId, roundId, ui, position, row, col)}} grid={[SQUARE_SIZE, SQUARE_SIZE]} >
        <div style={{width: SQUARE_SIZE}} className={classes}>&#9822;</div>
      </Draggable>
      <div>{children}</div>
    </div>
  )
}

const moveKnight = ( gameId, handId, roundId, ui, position, row, col)=> {
  col = (ui.lastX / SQUARE_SIZE) + col
  row = (ui.lastY / SQUARE_SIZE) + row
  let canMove = canMoveKnight(ui.lastX, ui.lastY)

  let square = [row, col]
  if (canMove){
    fetch(`${API_ROOT}/games/${gameId}/hands/${handId}/rounds/${roundId}/move`,{
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({'game': {'position' : position, 'move': square} } )
    });
  } else {
    window.location.reload()
    console.log('ERROR')
  }
}

export default Knight
