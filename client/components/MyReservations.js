import React from 'react'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import {connect} from 'react-redux'
import {fetchMyReservations} from '../store/reservation'

class MyReservations extends React.Component {
  componentDidMount() {
    this.props.fetchMyReservations(this.props.userId)
  }
  render() {
    const {myReservations} = this.props
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Waiter</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myReservations.map(reservation => {
            return (
              <TableRow key={reservation.id}>
                <TableCell>{reservation.date}</TableCell>
                <TableCell>{reservation.location.name}</TableCell>
                <TableCell>{reservation.seller.name}</TableCell>
                <TableCell>{reservation.status.type}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    )
  }
}
const mapStateToProps = state => ({
  userId: state.user.id,
  myReservations: state.reservation.reservationsByUser
})

const mapDispatchToProps = dispatch => {
  return {
    fetchMyReservations: userId => dispatch(fetchMyReservations(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyReservations)
