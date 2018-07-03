import React from 'react'
import MyReservations from './myReservations'
import MyInfo from './myInfo'
import {connect} from 'react-redux'
import {fetchMyReservations} from '../store/reservation'

class UserAccount extends React.Component {
  render() {
    return (
      <div>
        <MyInfo user={this.props.user} />
        <MyReservations
          headline="Have others waiting in the line"
          columnName="Waiter"
          propName="seller"
          fromId={this.props.user.id}
          myReservations={this.props.myReservations.filter(
            reservation => reservation.buyerId === this.props.user.id
          )}
        />
        <MyReservations
          headline="Wait in the line for others"
          columnName="Client"
          propName="buyer"
          fromId={this.props.user.id}
          myReservations={this.props.myReservations.filter(
            reservation => reservation.sellerId === this.props.user.id
          )}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  myReservations: state.reservation
})

const mapDispatchToProps = dispatch => {
  return {
    fetchMyReservations: userId => dispatch(fetchMyReservations(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount)
