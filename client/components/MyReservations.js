import React from 'react'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import {connect} from 'react-redux'

const MyReservations = props => {
  const {myReservations} = props
  return <Table />
}
const mapStateToProps = state => ({
  myReservations: state.reservation.sessionSecurities
})

export default connect(mapStateToProps)(MyReservations)
