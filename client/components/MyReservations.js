import React from 'react'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import {Link} from 'react-router-dom'

const MyReservations = props => {
  return (
    <div>
      <h3>{props.headline}</h3>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>{props.columnName}</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Chat</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.myReservations.map(reservation => {
            if (reservation[props.propName]) {
              return (
                <TableRow key={reservation.id}>
                  <TableCell>{reservation.date}</TableCell>
                  <TableCell>{reservation.location.name}</TableCell>
                  <TableCell>{reservation[props.propName].name}</TableCell>
                  <TableCell>{reservation.status.type}</TableCell>
                  <TableCell>
                    <Link to="/chat">Chat!</Link>
                  </TableCell>
                </TableRow>
              )
            } else {
              return (
                <TableRow key={reservation.id}>
                  <TableCell>{reservation.date}</TableCell>
                  <TableCell>{reservation.location.name}</TableCell>
                  <TableCell>N/A</TableCell>
                  <TableCell>{reservation.status.type}</TableCell>
                  <TableCell>Chat Not Available</TableCell>
                </TableRow>
              )
            }
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default MyReservations
