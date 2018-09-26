import React from 'react'
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom'
import { API_ROOT, HEADERS } from '../constants'
const guid = (len) => {
  var buf = [],
    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    charlen = chars.length,
    length = len || 32;

  for (var i = 0; i < length; i++) {
    buf[i] = chars.charAt(Math.floor(Math.random() * charlen));
  }

  return buf.join('');
}

const defaultGame = {
    playerOne: 'whee',
    playerTwo: '',
    stack: '1000',
    blinds: '50',
    timer: '30',
    playerOneReady: false,
    playerTwoReady: false,
    copied: false,
    gameId: guid()
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  createGame(){
    fetch(`${API_ROOT}/games`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(defaultGame)
    }).then(
      (response)=> {return response.json() }
    ).then((data) => {
      if(data.gameId){
        window.location = `/games/${data.gameId}`
      } else {
        console.log(data)
        alert('Error')
      }
    })
  }

  render(){
    const opts = {
      height: '390',
      width: '414',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    }
    return(
      <div>
        <h1>Welcome</h1>
        <div className='my-2'>
          <YouTube
            videoId="2g811Eo7K8U"
            opts={opts}
            onReady={this._onReady}
          />
        </div>
        <button onClick={this.createGame} className='w-full border-4 border-indigo m-2 p-2 text-xl no-underline flex justify-center'>
          Start a Game
        </button>
      </div>
    )
  }
}

export default Home
