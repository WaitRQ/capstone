import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {withStyles} from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import {LocationStyles} from './style'
import Input from '@material-ui/core/Input'
import TextField from '@material-ui/core/TextField'

import Event from '@material-ui/icons/Event'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import CardMedia from '@material-ui/core/CardMedia'

import Card from '@material-ui/core/Card'

const openResTemp = [
  {
    price: 10,
    id: 5,
    date: '2018-06-27',
    time: '09:00:00',
    seller: {name: 'Murphy'}
  },
  {
    price: 25.5,
    id: 1,
    date: '2018-06-29',
    time: '09:00:00',
    seller: {name: 'Cody'}
  },
  {
    price: 38.5,
    id: 2,
    date: '2018-06-29',
    time: '09:00:00',
    seller: {name: 'Stella'}
  }
]

class LocationScreen extends Component {
  constructor(props) {
    super(props)
  }

  handleChange = async itemId => {}

  render() {
    console.log('This is my user id', this.props.user)

    const openReservations = this.props.allOpenReservations.filter(
      reservation => {
        return reservation.locationId === this.props.location.id
      }
    )

    var editButton = false

    const {classes} = this.props
    return (
      <Paper style={{backgroundColor: '#DED7D7', maxHeight: '20em'}}>
        <List>
          <ListItem>
            <FormControl
              style={{backgroundColor: 'white'}}
              fullWidth
              className={classes.margin}
            >
              <Input
                id="adornment-amount"
                value={`${this.props.location.name}  ${
                  this.props.location.address
                }`}
              />
            </FormControl>
          </ListItem>
        </List>

        <Grid container style={{backgroundColor: '#DED7D7'}}>
          <Grid item md={5}>
            <Paper
              style={{
                padding: 20,
                marginTop: 10,
                marginLeft: 20,
                marginRight: 20
              }}
            >
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image="https://cbsnewyork.files.wordpress.com/2014/09/455720728.jpg?w=594"
                  title="Why Wait Online?"
                />
              </Card>
            </Paper>
          </Grid>

          <Grid item md={7}>
            <Paper
              style={{
                padding: 20,
                marginTop: 10,
                marginRight: 20,
                marginBottom: 20
              }}
            >
              <List className={classes.ListBox}>
                {openResTemp.map((item, index) => {
                  if (this.props.user.id === item.id) {
                    editButton = true
                  }
                  return (
                    <div key={index}>
                      <ListItem className={classes.MyList}>
                        <div>
                          <Input
                            id="adornment-amount"
                            value={`${this.props.location.name}  ${
                              this.props.location.address
                            }`}
                          />
                          <br />

                          <Input
                            style={{marginRight: 40}}
                            id="adornment-amount"
                            value={`${this.props.location.name}  ${
                              this.props.location.address
                            }`}
                          />

                          <Input
                            id="adornment-amount"
                            value={`${this.props.location.name}  ${
                              this.props.location.address
                            }`}
                          />
                        </div>

                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                        >
                          Reserve
                        </Button>
                      </ListItem>
                      <Divider />
                    </div>
                  )
                })}
              </List>

              <Button
                style={{marginTop: 20}}
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                Make New Reservation
                <Event className={classes.rightIcon} />
              </Button>
              {editButton ? (
                <Button
                  style={{marginTop: 20}}
                  onClick={() => this.handleClick(item.id)}
                  variant="contained"
                  className={classes.button}
                >
                  Edit Price
                </Button>
              ) : (
                ''
              )}
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}
/**
 * CONTAINER
 */

const mapStateToProps = state => ({
  allOpenReservations: state.reservation.newReservations,
  user: state.user
})

export default connect(mapStateToProps, null)(
  withStyles(LocationStyles)(LocationScreen)
)

LocationScreen.propTypes = {
  classes: PropTypes.object.isRequired
}

// <TextField
//   id="name"
//   label="Price"
//   className={classes.textField}
//
//   onChange={this.handleChange('name')}
//   margin="normal"
// />
// <TextField
//  id="name"
//  label="Contact"
//  className={classes.textField}
//
//  onChange={this.handleChange('name')}
//  margin="normal"
// />
// <TextField
// id="name"
// label="Time"
// className={classes.textField}
//
// onChange={this.handleChange('name')}
// margin="normal"
// />
