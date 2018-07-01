import React from 'react'
import Card from '@material-ui/core/Card'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {connect} from 'react-redux'
import {subscribeMessages, clearMessages} from '../store/message'

class Chat extends React.Component {
  componentDidMount() {
    this.props.clearMessages()
    const {reservationId} = this.props.match.params
    this.props.subscribeMessages(+reservationId)
  }
  render() {
    console.log('______________', this.props.historyMessages)
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
        <Card>
          <TextField placeholder="this is a message" />
          <Button>Send</Button>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  historyMessages: state.message
})

const mapDispatchToProps = dispatch => {
  return {
    subscribeMessages: reservationId =>
      dispatch(subscribeMessages(reservationId)),
    clearMessages: () => dispatch(clearMessages())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
