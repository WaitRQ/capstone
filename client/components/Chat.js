import React from 'react'
import Card from '@material-ui/core/Card'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

class Chat extends React.Component {
  render() {
    return (
      <div>
        <Card>
          <List>
            <ListItem>1111</ListItem>
            <Divider />
            <ListItem>2222</ListItem>
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

export default Chat
