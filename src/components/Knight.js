import React from 'react'
import Draggable from 'react-draggable'
const SQUARE_SIZE = 50
const API_ROOT = 'http://localhost:3000'
const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

const Knight = ({children})=>{
  console.log(children)
  return(
    <div>
      <Draggable onStop={(e,ui)=>{ moveKnight(ui, true)}} grid={[SQUARE_SIZE, SQUARE_SIZE]}>
        <div style={{width: '50px'}} className="w-4 fixed opacity-75 bg-orange-darker text-white border-2 border-white rounded-full">&#9822;</div>
      </Draggable>
      <div>{children}</div>
    </div>
  )
}
const moveKnight = (ui, white)=> {
  let color = white ? 'white' : 'black'
  console.log(white ? 'moved white' : 'moved black')
  let col = (ui.lastX / SQUARE_SIZE) + 1
  let row = white ? (ui.lastY / SQUARE_SIZE) + 8 : (ui.lastY / SQUARE_SIZE) + 1
  fetch(`${API_ROOT}/games/1/move`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({'game': {'color' : color, 'col': col, 'row': row } } )
  });
  console.log('col ' + col)
  console.log('row ' + row)
}

export default Knight
