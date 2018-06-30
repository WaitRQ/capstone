import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {withStyles} from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import {LocationStyles} from './style'
import Input from '@material-ui/core/Input'

import Typography from '@material-ui/core/Typography'

import Event from '@material-ui/icons/Event'
import Button from '@material-ui/core/Button'

import CardMedia from '@material-ui/core/CardMedia'

import Card from '@material-ui/core/Card'

import editReservation from '../store/reservation'

class LocationScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      price: 0
    }
  }

  handleClick = async () => {
    event.preventDefault()
    const id = this.props.user.id
    const price = this.state.price
    const updateObj = {id, price}
    await this.props.editReservation(updateObj)
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    console.log('This is my user id', this.props.user)

    const openReservations = this.props.allOpenReservations.filter(
      reservation => {
        return reservation.locationId === this.props.location.id
      }
    )

    var editButton = false
    var editable = false

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

        <Grid
          container
          className={classes.cont}
          style={{backgroundColor: '#DED7D7'}}
        >
          <Grid item md={6}>
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

          <Grid item md={6}>
            <Paper
              style={{
                padding: 20,
                marginTop: 10,
                marginRight: 20,
                marginBottom: 20
              }}
            >
              <List className={classes.ListBox}>
                {openReservations.map((item, n) => {
                  if (this.props.user.id === item.id) {
                    editButton = true
                    editable = true
                  }
                  return (
                    <div className={classes.row} key={n}>
                      <ListItem>
                        <div>
                          <Typography variant="subheading" gutterBottom>
                            {`Date: ${item.date}_______  Time: ${
                              item.time
                            }_______  Contact: ${item.seller.name}`}
                          </Typography>
                          <br />
                          {editable ? (
                            <Input
                              id="price"
                              name="price"
                              value={this.state.price}
                              onChange={this.handleChange}
                            />
                          ) : (
                            <Input value={item.price} />
                          )}
                        </div>

                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                        >
                          Reserve
                        </Button>
                      </ListItem>
                    </div>
                  )
                })}
              </List>

              <Button
                style={{marginTop: 20}}
                variant="contained"
                color="secondary"
                onClick={this.handleClick}
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

const mapDispatchToProps = dispatch => ({
  editReservation: updateObj => dispatch(editReservation(updateObj))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(LocationStyles)(LocationScreen)
)

LocationScreen.propTypes = {
  classes: PropTypes.object.isRequired
}
