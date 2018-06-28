import React from 'react'
import Avatar from '@material-ui/core/Avatar'

const MyInfo = props => {
  return (
    <div>
      <Avatar src={props.user.imageUrl} />
      <div>Name: {props.user.name}</div>
      <div>Email: {props.user.email}</div>
    </div>
  )
}

export default MyInfo
