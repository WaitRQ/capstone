import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Typography from '@material-ui/core/Typography'

const Navbar = ({email, isLoggedIn}) => (
  <div className="navbar flex justify-between items-baseline">
    <div className="self-baseline">
      <Typography variant="title" color="inherit">
        waitRQ
      </Typography>
    </div>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <h3>Welcome, {email}</h3>
        </div>
      ) : (
        <div>
          <h3>Please login</h3>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    email: state.user.email
  }
}

export default connect(mapState)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}
