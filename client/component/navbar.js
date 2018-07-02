import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import {AvatarStyles} from './style'
import {withStyles} from '@material-ui/core/styles'

function Navbar(props) {
  const {name, imageUrl, email, isLoggedIn, classes} = props
  return (
    <div className="navbar flex justify-between items-baseline">
      <div className="self-baseline">
        <Typography variant="title" color="inherit">
          waitRQ
        </Typography>
      </div>
      <nav>
        {isLoggedIn ? (
          <div className="flex">
            {/* The navbar will show these links after you log in */}
            <h3>Welcome, {name ? name : email}</h3>
            <div className={classes.row}>
              <Avatar
                alt="Remy Sharp"
                src={imageUrl}
                className={classes.avatar}
              />
            </div>
          </div>
        ) : (
          <div>
            <h3>Please login</h3>
          </div>
        )}
      </nav>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    email: state.user.email,
    name: state.user.name,
    imageUrl: state.user.imageUrl,
    userId: state.user.id
  }
}

export default withStyles(AvatarStyles)(connect(mapState)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}
