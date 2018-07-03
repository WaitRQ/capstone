import React from 'react'
import {connect} from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Star from '@material-ui/icons/Star'
import {withStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import classNames from 'classnames'

const styles = theme => ({
  starIcon: {
    color: '#FFD54F'
  },
  avatar: {
    margin: 20
  },
  bigAvatar: {
    width: 100,
    height: 100
  },
  editButton: {
    margin: 20
  }
})

const MyProfile = props => {
  const {classes} = props
  return (
    <div>
      <Avatar
        src={props.user.imageUrl}
        className={classNames(classes.avatar, classes.bigAvatar)}
      />
      <List>
        <ListItem>
          Rating: <Star className={classes.starIcon} />
          <Star className={classes.starIcon} />
          <Star className={classes.starIcon} />
          <Star className={classes.starIcon} />
          <Star className={classes.starIcon} />
        </ListItem>
        <ListItem>Name: {props.user.name}</ListItem>
        <ListItem>Email: {props.user.email}</ListItem>
      </List>
      <Link to="/edit">
        <Button variant="outlined" className={classes.editButton}>
          edit my profile
        </Button>
      </Link>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

export default withStyles(styles)(connect(mapStateToProps)(MyProfile))
