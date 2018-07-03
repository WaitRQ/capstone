import React from 'react'
import {connect} from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'

class MyProfile extends React.Component {
  render() {
    return (
      <div>
        <Avatar src={this.props.user.imageUrl} />
        <div>Place Holder for Ratings</div>
        <div>Name: {this.props.user.name}</div>
        <div>Email: {this.props.user.email}</div>
        <Link to="/edit">
          <Button variant="outlined">edit my profile</Button>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(MyProfile)
