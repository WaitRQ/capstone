import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const Header = props => {
  return (
    <AppBar position="static" color="inherit">
      <Toolbar>
        <Typography variant="headline" color="primary">
          {props.location.name}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
