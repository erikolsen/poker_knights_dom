import React from 'react'
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom'
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
        <div className='w-full'>
          <Link to={'/games/' + guid()} className='border-4 border-indigo m-2 p-2 text-xl no-underline flex justify-center'>Start a Game</Link>
        </div>
      </div>
    )
  }
}

export default Home
