import React from 'react'
import MyReservations from './MyReservations'
import MyTasks from './MyTasks'
import MyInfo from './MyInfo'

class UserAccount extends React.Component {
  render() {
    return (
      <div>
        <MyInfo />
        <MyReservations />
        <MyTasks />
      </div>
    )
  }
}

export default UserAccount
