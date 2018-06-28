import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import {MiniDrawer} from './components'
import App from './components/app'

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <MiniDrawer />
        <App />
      </div>
    </Router>
  </Provider>,
  document.getElementById('app')
)
