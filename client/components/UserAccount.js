import React from 'react'
import MyReservations from './MyReservations'
import MyInfo from './MyInfo'
import {connect} from 'react-redux'
import {fetchMyReservations} from '../store/reservation'

class UserAccount extends React.Component {
  componentDidMount() {
    this.props.fetchMyReservations(this.props.user.id)
  }
  render() {
    return (
      <div>
        <MyInfo user={this.props.user} />
        <MyReservations
          headline="Have others waiting in the line"
          columnName="Waiter"
          propName="seller"
          myReservations={this.props.myReservations.filter(
            reservation => reservation.buyerId === this.props.user.id
          )}
        />
        <MyReservations
          headline="Wait in the line for others"
          columnName="Client"
          propName="buyer"
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
  myReservations: state.reservation.reservationsByUser
})

const mapDispatchToProps = dispatch => {
  return {
    fetchMyReservations: userId => dispatch(fetchMyReservations(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount)
