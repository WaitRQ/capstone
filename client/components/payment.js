import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout'
import store, {createReservation} from '../store'

// to make this live, replace external data-key

// need the following props:
// amount = this.props.amount
// description =this.props.description

//Payment doesn't work yet b/c we need a store/thunk

class Payment extends Component {
  onToken = token => {
    store.dispatch(
      createReservation({
        reservation: {
          price: this.props.price,
          date: this.props.date,
          time: this.props.time,
          locationId: this.props.id,
          buyerId: this.props.userId,
          statusId: 1
        },
        stripeObject: {
          description: 'Reservation for ' + this.props.name,
          source: token.id,
          currency: 'usd',
          amount: this.props.price * 100
        }
      })
    )
    this.props.handlePaid()
  }
  render() {
    let paymentAmount = 100
    if (this.props.price) {
      paymentAmount = this.props.price * 100
    }
    let name = 'some location'
    if (this.props.name) {
      name = this.props.name
    }
    return (
      <div>
        <StripeCheckout
          token={this.onToken}
          stripeKey="pk_test_g6do5S237ekq10r65BnxO6S0"
          name="waitRQ Co." // the pop-in header title
          description={'Reservation for ' + name} // the pop-in header subtitle
          image="https://stripe.com/img/documentation/checkout/marketplace.png" // the pop-in header image (default none)
          ComponentClass="div"
          panelLabel="Book Reservation" // prepended to the amount in the bottom pay button
          amount={paymentAmount} // cents
          currency="USD"
        />
      </div>
    )
  }
}

export default Payment
