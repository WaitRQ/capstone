import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'

const MyInfo = props => {
  return (
    <div>
      <Avatar src={props.user.imageUrl} />
      <div>Name: {props.user.name}</div>
      <div>Email: {props.user.email}</div>
      <Link to={`/profile/${props.user.id}`}>
        <Button>edit my profile</Button>
      </Link>
    </div>
  )
}

export default MyInfo
