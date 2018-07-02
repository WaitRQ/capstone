import React from 'react'
import {connect} from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import {getReservationMessages} from '../store'
import TextField from '@material-ui/core/TextField'
import Chat from './chat'

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
    let fromId,
      toId = 0
    if (this.props.allReservations.length > 0) {
      const singleReservation = this.props.allReservations.filter(
        res => this.state.reservationId === res.id
      )[0]
      buyerId = singleReservation.buyerId
      sellerId = singleReservation.sellerId
      buyerUrl = singleReservation.buyer.imageUrl
      sellerUrl = singleReservation.seller.imageUrl
      fromId = this.props.userId
      if ((buyerId = this.props.userId)) {
        toId = sellerId
      } else {
        toId = buyerId
      }
      console.log('from and to id', fromId, toId)
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
        <Chat
          reservationId={this.state.reservationId}
          fromId={fromId}
          toId={toId}
        />
        <br />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allReservations: state.reservation,
  messages: state.message.historyMessages,
  userId: state.user.id
})

const mapDispatchToProps = dispatch => {
  return {
    fetchMyMessages: reservationId =>
      dispatch(getReservationMessages(reservationId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeLine)
