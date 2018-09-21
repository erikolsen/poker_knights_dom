import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { API_WS_ROOT } from './constants'
import { ActionCableProvider } from 'react-actioncable-provider'
import { BrowserRouter as Router } from 'react-router-dom'

if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

ReactDOM.render(
  <ActionCableProvider url={API_WS_ROOT}>
    <Router>
      <App />
    </Router>
  </ActionCableProvider>,
  document.getElementById('root')
)
registerServiceWorker()
