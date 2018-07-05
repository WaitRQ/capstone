import React from 'react'
import Card from '@material-ui/core/Card'
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
import ChatBubble from './chatBubble'

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

  scrollDown = () => {
    window.setTimeout(function() {
      var elem = document.getElementById('chatWindow')
      elem.scrollTop = elem.scrollHeight
    }, 1000)
  }

  render() {
    let chatMessages = {
      type: 1,
      image: 'https://identix.state.gov/qotw/images/no-photo.gif',
      text: 'No chats available'
    }
    if (this.props.historyMessages) {
      chatMessages = this.props.historyMessages.map(message => {
        let type = this.props.userId === message.fromId ? 0 : 1
        let image = message.fromId
          ? message.from.imageUrl
          : 'https://avatars3.githubusercontent.com/u/40404440?s=200&v=4'
        let text = message.text
        let time =
          '(' +
          message.createdAt.slice(11, 16) +
          ' on ' +
          message.createdAt.slice(0, 10) +
          ')'
        return {type, image, text, time}
      })
    }
    this.scrollDown()
    return (
      <div>
        {this.state.video ? (
          <VideoComponent
            reservationId={this.props.reservationId}
            videoOff={this.videoOff}
          />
        ) : (
          <div>
            <div
              id="chatWindow"
              style={{maxHeight: '70vh', overflowY: 'scroll'}}
            >
              <Card>
                <ChatBubble messages={chatMessages} />
              </Card>
            </div>
            <div className="flex flex-row justify-center items-center">
              <div className="col col-11">
                <form
                  noValidate
                  autoComplete="off"
                  onSubmit={this.handleSubmit}
                >
                  <div style={{width: '90%'}}>
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
                      margin="dense"
                      onChange={this.handleChange}
                    />
                  </div>
                  <Button variant="outlined" type="submit" color="primary">
                    Send
                  </Button>
                </form>
              </div>
              <div className="col col-1">
                <Button
                  variant="outlined"
                  onClick={this.videoOn}
                  color="primary"
                >
                  Video Chat
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  historyMessages: state.message.historyMessages,
  newMessageText: state.message.newMessageText,
  userId: state.user.id
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
