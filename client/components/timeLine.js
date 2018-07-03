import React from 'react'
import {connect} from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Chat from './chat'

class TimeLine extends React.Component {
  render() {
    const reservationId = Number(this.props.match.params.reservationId)
    const [singleReservation] = this.props.allReservations.filter(
      res => reservationId === res.id
    )
    const buyerId = singleReservation.buyerId
    const sellerId = singleReservation.sellerId
    const buyerUrl = singleReservation.buyer.imageUrl
    const sellerUrl = singleReservation.seller.imageUrl
    const fromId = this.props.userId
    const toId = buyerId === this.props.userId ? sellerId : buyerId

    const lineStyle = {
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
          reservationId={Number(this.props.match.params.reservationId)}
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

export default connect(mapStateToProps)(TimeLine)
