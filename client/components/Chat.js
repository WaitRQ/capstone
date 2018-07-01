import React from 'react'
import Card from '@material-ui/core/Card'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import {connect} from 'react-redux'
import {
  subscribeMessages,
  clearMessages,
  postMessage,
  writeMessage
} from '../store/message'

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.clearMessages()
    const {reservationId} = this.props.match.params
    this.props.subscribeMessages(+reservationId)
  }
  handleChange(event) {
    console.log(event.target.value)
    this.props.writeMessage(event.target.value)
  }

  handleSubmit(event) {
    event.preventDefault()
    const reservationId = Number(this.props.match.params.reservationId)
    const fromId = Number(this.props.match.params.fromId)
    const toId = Number(this.props.match.params.toId)
    this.props.postMessage({
      text: this.props.newMessageText,
      reservationId: reservationId,
      fromId: fromId,
      toId: toId
    })
    this.props.writeMessage('')
  }
  render() {
    return (
      <div>
        <Card>
          <List>
            {this.props.historyMessages.map(message => (
              <div key={message.id}>
                <ListItem>
                  {message.from.name} : {message.text} --{' '}
                  {message.createdAt.slice(11, 19)} on{' '}
                  {message.createdAt.slice(0, 10)}
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Card>
        <form onSubmit={this.handleSubmit}>
          <input
            name="messageText"
            type="text"
            value={this.props.newMessageText}
            onChange={this.handleChange}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  historyMessages: state.message.historyMessages,
  newMessageText: state.message.newMessageText
})

const mapDispatchToProps = dispatch => {
  return {
    subscribeMessages: reservationId =>
      dispatch(subscribeMessages(reservationId)),
    clearMessages: () => dispatch(clearMessages()),
    postMessage: message => dispatch(postMessage(message)),
    writeMessage: messageText => dispatch(writeMessage(messageText))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
