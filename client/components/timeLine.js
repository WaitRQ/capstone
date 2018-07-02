import React from 'react'
import {connect} from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import {getReservationMessages} from '../store'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TextField from '@material-ui/core/TextField'

class TimeLine extends React.Component {
  componentDidMount() {
    this.props.fetchMyMessages(6) //make sure we get reservationID as props
  }
  onSubmit = evt => {
    evt.preventDefault()
    console.log('you hit enter')
    //need to fill this out more
  }
  render() {
    let buyerId,
      sellerId,
      buyerUrl,
      sellerUrl = ''
    if (this.props.singleReservation) {
      buyerId = this.props.singleReservation.buyerId
      sellerId = this.props.singleReservation.sellerId
      buyerUrl = this.props.singleReservation.buyer.imageUrl
      sellerUrl = this.props.singleReservation.seller.imageUrl
    }
    let lineStyle = {
      borderTop: 'dotted 5px'
    }
    return (
      <div>
        <Typography variant="headline" component="h3">
          Timeline for Reservation
        </Typography>
        <div className="clearfix md-flex flex-row items-baseline justify-center">
          <div className="align-end">
            {buyerId && <Avatar src={buyerUrl} />}
          </div>
          <hr style={lineStyle} className="col col-4" />
          <div className="flex-auto">
            {sellerId && <Avatar src={sellerUrl} />}
          </div>
        </div>
        {this.props.messages[0] && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date/Time</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>From</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.messages.map(message => {
                return (
                  <TableRow key={message.id}>
                    <TableCell>{message.createdAt}</TableCell>
                    <TableCell>{message.text}</TableCell>
                    <TableCell>{message.from.name}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
        <br />
        <form noValidate autoComplete="off" onSubmit={this.onSubmit}>
          <TextField
            id="full-width"
            label="Send Message:"
            InputLabelProps={{
              shrink: true
            }}
            placeholder="type message here"
            fullWidth
            margin="normal"
          />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleReservation: state.reservation.find(res => {
    return res.id === 6
  }), //change this to filter for some reservationID
  messages: state.message
})

const mapDispatchToProps = dispatch => {
  return {
    fetchMyMessages: reservationID =>
      dispatch(getReservationMessages(reservationID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeLine)
