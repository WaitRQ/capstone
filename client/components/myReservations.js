import React from 'react'
import ReservationTable from './reservationTable'
import {connect} from 'react-redux'

class MyReservations extends React.Component {
  render() {
    return (
      <div>
        <ReservationTable
          headline="Have others waiting in the line"
          columnName="Waiter"
          propName="seller"
          fromId={this.props.user.id}
          myReservations={this.props.myReservations.filter(
            reservation => reservation.buyerId === this.props.user.id
          )}
        />
        <ReservationTable
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

export default connect(mapStateToProps)(MyReservations)
