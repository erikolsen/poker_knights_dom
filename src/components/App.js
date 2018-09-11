import React, { Component } from 'react';
import Board from './Board'

class App extends Component {
  render() {
    return (
      <div>
        <header className="bg-black text-white h-12 text-2xl p-4 w-full mb-2">Poker Knights</header>

        <Board />
        <button onClick={()=> window.location.reload()} className="hidden border border-grey p-4 rounded-lg w-full">New Deal</button>
      </div>
    );
  }
}

export default App;
