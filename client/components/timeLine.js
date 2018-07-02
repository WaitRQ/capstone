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
  constructor(props) {
    super(props)
    this.state = {
      reservationId: 0
    }
  }
  componentDidMount() {
    const reservationId = Number(this.props.match.params.reservationId)
    this.setState({reservationId: reservationId})
    this.props.fetchMyMessages(reservationId)
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
    console.log(this.props.allReservations)
    if (this.props.allReservations.length > 0) {
      const singleReservation = this.props.allReservations.filter(
        res => this.state.reservationId === res.id
      )[0]
      buyerId = singleReservation.buyerId
      sellerId = singleReservation.sellerId
      buyerUrl = singleReservation.buyer.imageUrl
      sellerUrl = singleReservation.seller.imageUrl
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
  allReservations: state.reservation,
  messages: state.message
})

const mapDispatchToProps = dispatch => {
  return {
    fetchMyMessages: reservationId =>
      dispatch(getReservationMessages(reservationId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeLine)
