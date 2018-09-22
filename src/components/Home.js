import React from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      white: '',
      black: '',
      stack: '1000',
      blinds: '50',
      timer: '30',
      whiteReady: false,
      blackReady: false,
      gameLink: window.location + 'aqwerpoih',
      copied: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    switch (event.target.name) {
      case 'whiteReady':
        if(!!this.state.white){
          this.setState(prevState => ({
            whiteReady: !prevState.whiteReady
          }));
        }
        break;
      case 'blackReady':
        if(!!this.state.black){
          this.setState(prevState => ({
            blackReady: !prevState.blackReady
          }));
        }
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
      case 'white':
        if(!this.state.whiteReady){
          this.setState({white: event.target.value})
        }
        break;
      case 'black':
        if(!this.state.blackReady){
          this.setState({black: event.target.value})
        }
        break;
      default:
        console.log('default')
        return ''
    }
  }

  render() {
    let blackReady = this.state.blackReady ? ' border-2 border-indigo' : ''
    let whiteReady = this.state.whiteReady ? ' border-2 border-indigo' : ''

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

          <div className={'flex items-center my-2' + whiteReady}>
            <label className='my-2 flex'>
              <span className='mr-2'>White:</span>
              <input className='border bg-grey-lighter w-full mr-2' name='white' type="text" value={this.state.white} onChange={this.handleChange} />
            </label>
            <button className='border-2 border-indigo p-1 text-xl' name='whiteReady' onClick={this.handleChange} value={this.state.whiteReady}>
              { this.state.whiteReady ? 'Leave' : 'Ready' }
            </button>
          </div>

          <div className={'flex items-center my-2' + blackReady}>
            <label className='my-2 flex'>
              <span className='mr-2'>Black:</span>
              <input className='border bg-grey-lighter w-full mr-2' name='black' type="text" value={this.state.black} onChange={this.handleChange} />
            </label>
            <button className='border-2 border-indigo p-1 text-xl' name='blackReady' onClick={this.handleChange} value={this.state.blackReady}>
              { this.state.blackReady ? 'Leave' : 'Ready' }
            </button>
          </div>

          <div>
            <h5>To invite someone to the join send them this link. Game will start when both players are ready.</h5>
            <p className='m-2'>
              {this.state.gameLink}
            </p>
            <CopyToClipboard text={this.state.gameLink}
              onCopy={() => this.setState({copied: true})}>
              <button className='border-2 border-indigo p-1 text-xl w-full'>Copy Link</button>
            </CopyToClipboard>

            {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
          </div>
          <div>
            <h1 className='text-indigo text-center' >
              { this.state.whiteReady && this.state.blackReady && !!this.state.white && !!this.state.black ? 'Game Starting' : '' }
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Home
