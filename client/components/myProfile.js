import React from 'react'
import {connect} from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Star from '@material-ui/icons/Star'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  starIcon: {
    color: '#FFD54F'
  }
})

const MyProfile = props => {
  const {classes} = props
  return (
    <div>
      <Avatar src={props.user.imageUrl} />
      <div>
        Rating: <Star className={classes.starIcon} />{' '}
        <Star className={classes.starIcon} />
        <Star className={classes.starIcon} />
        <Star className={classes.starIcon} />
        <Star className={classes.starIcon} />
      </div>
      <div>Name: {props.user.name}</div>
      <div>Email: {props.user.email}</div>
      <Link to="/edit">
        <Button variant="outlined">edit my profile</Button>
      </Link>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

export default withStyles(styles)(connect(mapStateToProps)(MyProfile))
