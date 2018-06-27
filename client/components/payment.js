import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout'
import store, {putTransactions} from '../store'
// to make this live, replace external data-key

// need the following props:
// amount = this.props.amount
// description =this.props.description

//Payment doesn't work yet b/c we need a store/thunk

class Payment extends Component {
  onToken = token => {
    console.log(token)
    // store.dispatch(
    //   putTransactions({
    //     transactions: this.props.transactions,
    //     stripeObject: {
    //       description: 'Example charge',
    //       source: token.id,
    //       currency: 'usd',
    //       amount: this.props.amount * 100
    //     }
    //   })
    // )
    //need to figure out how this goes to the store to the backend
  }
  render() {
    let paymentAmount = 100
    if (this.props.price) {
      paymentAmount = this.props.price * 100
    }
    let paymentDescription = 'some location'
    if (this.props.description) {
      paymentDescription = this.props.description
    }
    return (
      <div>
        <StripeCheckout
          token={this.onToken}
          stripeKey="pk_test_g6do5S237ekq10r65BnxO6S0"
          name="waitRQ Co." // the pop-in header title
          description={'Reservation for ' + paymentDescription} // the pop-in header subtitle
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
