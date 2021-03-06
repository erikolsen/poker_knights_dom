import React from 'react'
import YouTube from 'react-youtube';
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
    playerOne: '',
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
        <div className='my-4 flex justify-center'>
          <YouTube
            videoId="jQye51Pv-B8"
            opts={opts}
            onReady={this._onReady}
          />
        </div>
        <div className='w-full m-2 flex justify-center'>
          <button onClick={this.createGame} className='w-3/4 border-4 border-indigo m-2 p-4 text-xl no-underline'>
            Start a Game
          </button>
        </div>
      </div>
    )
  }
}

export default Home
