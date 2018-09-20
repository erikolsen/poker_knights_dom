import React from 'react'
import Draggable from 'react-draggable'
import { API_ROOT, HEADERS, SQUARE_SIZE } from '../constants'

const Knight = ({children, white, black, position, row, col})=>{
  let colors = white ? ' text-white border-white bg-orange-darker' :
                       ' text-black border-black bg-orange-lighter'

  let classes = "w-4 fixed border-2 rounded-full" + colors
  return(
    <div>
      <Draggable onStop={(e,ui)=>{ moveKnight(ui, white, position, row, col)}} grid={[SQUARE_SIZE, SQUARE_SIZE]} >
        <div style={{width: SQUARE_SIZE+'px'}} className={classes}>&#9822;</div>
      </Draggable>
      <div>{children}</div>
    </div>
  )
}

const moveKnight = (ui, white, position, row, col)=> {
  col = (ui.lastX / SQUARE_SIZE) + col
  row = (ui.lastY / SQUARE_SIZE) + row
  let gameId = window.location.pathname.split('/').last()

  let square = [row, col]
  if (row >= 0 && col >= 0){
    fetch(`${API_ROOT}/games/${gameId}/move`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({'game': {'position' : position, 'move': square} } )
    });
  } else {
    console.log('ERROR')
  }
}

export default Knight
