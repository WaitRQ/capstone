import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import {MiniDrawer} from './components'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import teal from '@material-ui/core/colors/teal'
import blueGrey from '@material-ui/core/colors/blueGrey'

// establishes socket connection
import './socket'

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: blueGrey
  },
  status: {
    danger: 'orange'
  }
})

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <MuiThemeProvider theme={theme}>
        <MiniDrawer />
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('app')
)
