import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List'
import HomeIcon from '@material-ui/icons/Home'
import WaitRQIcon from '@material-ui/icons/SupervisorAccount'
import AccountIcon from '@material-ui/icons/AccountCircle'
import ExitIcon from '@material-ui/icons/ExitToApp'
import SignupIcon from '@material-ui/icons/AddBox'
import LoginIcon from '@material-ui/icons/Person'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const FolderListItems = ({handleClick, isLoggedIn}) => {
  return (
    <>
      {isLoggedIn ? (
        <List>
          <Link to="/home">
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <ListItem button>
            <ListItemIcon>
              <WaitRQIcon />
            </ListItemIcon>
            <ListItemText primary="waitRQs" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AccountIcon />
            </ListItemIcon>
            <ListItemText primary="My Account" />
          </ListItem>
          <a href="#" onClick={handleClick}>
            <ListItem button>
              <ListItemIcon>
                <ExitIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </a>
        </List>
      ) : (
        <List>
          <Link to="/login">
            <ListItem button>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
          </Link>
          <Link to="/signup">
            <ListItem button>
              <ListItemIcon>
                <SignupIcon />
              </ListItemIcon>
              <ListItemText primary="Signup" />
            </ListItem>
          </Link>
        </List>
      )}
    </>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(FolderListItems)

/**
 * PROP TYPES
 */
FolderListItems.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
