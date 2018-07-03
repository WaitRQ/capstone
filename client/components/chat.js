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
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import VideoComponent from './videoComponent'

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      video: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.clearMessages()
    const reservationId = this.props.reservationId
    this.props.subscribeMessages(reservationId)
  }
  handleChange(event) {
    this.props.writeMessage(event.target.value)
  }

  handleSubmit(event) {
    event.preventDefault()
    const reservationId = this.props.reservationId
    const fromId = this.props.fromId
    const toId = this.props.toId
    this.props.postMessage({
      text: this.props.newMessageText,
      reservationId: reservationId,
      fromId: fromId,
      toId: toId
    })
    this.props.writeMessage('')
  }

  videoOn = () => {
    this.setState({video: true})
  }

  videoOff = () => {
    this.setState({video: false})
  }

  render() {
    return (
      <div>
        {this.state.video ? (
          <VideoComponent
            reservationId={this.props.reservationId}
            videoOff={this.videoOff}
          />
        ) : (
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
            <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
              <TextField
                name="messageText"
                id="full-width"
                label="Send Message:"
                InputLabelProps={{
                  shrink: true
                }}
                placeholder="type message here"
                value={this.props.newMessageText}
                fullWidth
                margin="normal"
                onChange={this.handleChange}
              />
              <Button type="submit">Send</Button>
            </form>
            <Button onClick={this.videoOn}>Video Chat</Button>
          </div>
        )}
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
