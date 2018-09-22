import React from 'react'
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom'

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
          <Link to='/lobby' className='border-4 border-indigo m-2 p-2 text-xl no-underline flex justify-center'>Start a Game</Link>
        </div>
      </div>
    )
  }
}

export default Home
