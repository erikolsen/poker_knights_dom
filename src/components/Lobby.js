import React from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import { API_ROOT, HEADERS } from '../constants'

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.gameLink = window.location.href
    this.state = {
      playerOne: '',
      playerTwo: '',
      stack: '1000',
      blinds: '50',
      timer: '30',
      playerOneReady: false,
      playerTwoReady: false,
      copied: false,
      gameId: props.match.params.gameId
    };

    this.handleChange = this.handleChange.bind(this);
  }

  createGame(){
    if(this.state.playerOneReady && this.state.playerTwoReady){
      fetch(`${API_ROOT}/games`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(this.state)
      }).then(
        (response)=> {return response.json() }
      ).then((data) => {
        if(data.success){
          window.location = window.location.href + '/hands/1/rounds/1'
        } else {
          console.log(data)
          alert('Error')
        }
      })
    }
  }

  handleChange(event) {
    switch (event.target.name) {
      case 'playerTwoReady':
        if(!!this.state.playerTwo){
          this.setState(prevState => ({
            playerTwoReady: !prevState.playerTwoReady
          }));
        }
        localStorage.setItem('playerTwo', this.state.playerTwo)
        break;
      case 'playerOneReady':
        if(!!this.state.playerOne){
          this.setState(prevState => ({
            playerOneReady: !prevState.playerOneReady
          }));
        }
        localStorage.setItem('playerOne', this.state.playerOne)
        break;
      case 'stack':
        this.setState({stack: event.target.value})
        break;
      case 'blinds':
        this.setState({blinds: event.target.value})
        break;
      case 'timer':
        this.setState({timer: event.target.value})
        break;
      case 'playerTwo':
        if(!this.state.playerTwoReady){
          this.setState({playerTwo: event.target.value})
        }
        break;
      case 'playerOne':
        if(!this.state.playerOneReady){
          this.setState({playerOne: event.target.value})
        }
        break;
      default:
        console.log('default')
        return ''
    }
  }

  render() {
    let playerOneReady = this.state.playerOneReady ? ' border-2 border-indigo' : ''
    let playerTwoReady = this.state.playerTwoReady ? ' border-2 border-indigo' : ''
    this.createGame()

    return (
      <div className='m-2'>
        <h1>Lobby</h1>
        <div className='text-2xl'>
          <div>
            <label className='my-2 flex'>
              <span className='mr-2 w-1/2'>Starting Stack:</span>
              <input className='border bg-grey-lighter mr-2 w-1/2' name='stack' type="number" value={this.state.stack} onChange={this.handleChange} />
            </label>
          </div>

          <div>
            <label className='my-2 flex'>
              <span className='mr-2 w-1/2'>Blinds:</span>
              <input className='border bg-grey-lighter mr-2 w-1/4' name='blinds' type="number" value={this.state.blinds} onChange={this.handleChange} />
              <input className='border bg-grey-lighter mr-2 w-1/4' name='blinds' type="number" value={Math.floor(this.state.blinds/2)} readOnly/>
            </label>
          </div>


          <div>
            <label className='my-2 flex'>
              <span className='mr-2 w-1/2'>Timer:</span>
              <input className='border bg-grey-lighter w-1/2 mr-2' name='timer' type="number" value={this.state.timer} onChange={this.handleChange} />
            </label>
          </div>

          <div className={'flex items-center my-2' + playerOneReady}>
            <label className='my-2 flex w-4/5'>
              <span className='mr-2 w-1/5'>Player One:</span>
              <input className='border bg-grey-lighter w-full mr-2 w-3/5' name='playerOne' type="text" value={this.state.playerOne} onChange={this.handleChange} />
            </label>
            <button className='border-2 border-indigo p-1 text-xl w-1/5' name='playerOneReady' onClick={this.handleChange} value={this.state.playerOneReady}>
              { this.state.playerOneReady ? 'Change' : 'Ready' }
            </button>
          </div>

          <div className={'flex items-center my-2' + playerTwoReady}>
            <label className='my-2 flex w-4/5'>
              <span className='mr-2 w-1/5'>Player Two:</span>
              <input className='border bg-grey-lighter w-full mr-2 w-3/5' name='playerTwo' type="text" value={this.state.playerTwo} onChange={this.handleChange} />
            </label>
            <button className='border-2 border-indigo p-1 text-xl w-1/5' name='playerTwoReady' onClick={this.handleChange} value={this.state.playerTwoReady}>
              { this.state.playerTwoReady ? 'Change' : 'Ready' }
            </button>
          </div>

          <div>
            <h5>To invite someone to the join send them this link. Game will start when both players are ready.</h5>
            <p className='m-2'>
              {this.gameLink}
            </p>
            <CopyToClipboard text={this.gameLink}
              onCopy={() => this.setState({copied: true})}>
              <button className='border-2 border-indigo p-1 text-xl w-full'>Copy Link</button>
            </CopyToClipboard>

            {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
          </div>
          <div>
            <h1 className='text-indigo text-center' >
              { this.state.playerTwoReady && this.state.playerOneReady && !!this.state.playerTwo && !!this.state.playerOne ? 'Game Starting' : '' }
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Lobby
