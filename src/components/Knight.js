import React from 'react'
import Draggable from 'react-draggable'
import { API_ROOT, HEADERS, SQUARE_SIZE } from '../constants'

const Knight = ({children, white, black, position})=>{
  let colors = white ? ' text-white border-white bg-orange-darker' :
                       ' text-black border-black bg-orange-lighter'

  let classes = "w-4 opacity-75 fixed border-2 rounded-full" + colors
  return(
    <div>
      <Draggable onStop={(e,ui)=>{ moveKnight(ui, white, position)}} grid={[SQUARE_SIZE, SQUARE_SIZE]}>
        <div style={{width: '50px'}} className={classes}>&#9822;</div>
      </Draggable>
      <div>{children}</div>
    </div>
  )
}
const moveKnight = (ui, white, position)=> {
  let color = white ? 'white' : 'black'
  let col = (ui.lastX / SQUARE_SIZE) + 1
  let row = white ? (ui.lastY / SQUARE_SIZE) + 8 : (ui.lastY / SQUARE_SIZE) + 1
  fetch(`${API_ROOT}/games/1/move`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({'game': {'color' : color, 'col': col, 'row': row } } )
  });
  console.log(white ? 'moved white' : 'moved black')
  console.log(position)
  console.log('col ' + col)
  console.log('row ' + row)
}

export default Knight
