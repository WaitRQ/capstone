import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import EditReservation from './editReservation'
import NewReservation from './newReservation'
import Header from './header'

import {withStyles} from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import {LocationStyles} from './style'

import Typography from '@material-ui/core/Typography'
import Event from '@material-ui/icons/Event'

import Button from '@material-ui/core/Button'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Divider from '@material-ui/core/Divider'

class LocationScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0
    }
  }

  handleClick = itemId => {
    console.log('this is item id', itemId)
  }
  handleTabChange = (event, value) => {
    this.setState({value})
  }

  render() {
    var openReservations = this.props.allOpenReservations.filter(
      reservation => {
        return reservation.locationId === this.props.location.id
      }
    )
    if (this.state.value === 0) {
      openReservations = openReservations.sort(function(resA, resB) {
        return resB.price - resA.price
      })
    }

    if (this.state.value === 1) {
      openReservations = openReservations.sort(function(resA, resB) {
        var tempA = resA.date.split('-')
        var tempB = resB.date.split('-')
        let shiftedA = tempA.shift()
        let shiftedB = tempB.shift()
        tempA.push(shiftedA)
        tempB.push(shiftedB)

        return Number(tempA.join('')) - Number(tempB.join(''))
      })
    }

    var editable = false
    var currentRes = {}

    const {classes} = this.props

    return (
      <>
        <Header />

        <Grid container>
          <Grid item sm>
            <Paper className={classes.leftPaperGrid}>
              {openReservations.map(item => {
                if (this.props.user.id === item.id) {
                  editable = true
                  currentRes = item
                }
                return (
                  <Fragment key={item.id}>
                    <Typography
                      style={{marginTop: 10}}
                      variant="headline"
                      color="primary"
                    >
                      Price: ${item.price}
                      <Button
                        onClick={() => this.handleClick(item.id)}
                        style={{float: 'right'}}
                        mini
                        variant="fab"
                        color="primary"
                        aria-label="add"
                      >
                        <Event />
                      </Button>
                    </Typography>

                    <List className={classes.list} component="ul">
                      <ListItem button>
                        <ListItemText primary={`Time: ${item.time}`} />
                      </ListItem>
                      <ListItem button component="a" href="#simple-list">
                        <ListItemText primary={`Date: ${item.date}`} />
                      </ListItem>
                    </List>
                    <Divider />
                  </Fragment>
                )
              })}
            </Paper>
          </Grid>

          <Grid item sm>
            <Paper className={classes.upperRightPaperGrid}>
              <Typography variant="headline" color="primary">
                Welcome {this.props.user.name}!
              </Typography>
              <Typography variant="subheading" color="primary">
                Your location: {this.props.location.name}
              </Typography>
              <Typography variant="subheading" color="primary">
                {this.props.location.address}
              </Typography>
            </Paper>
            <Paper className={classes.lowerRightPaperGrid}>
              {editable ? (
                <Fragment>
                  <Typography variant="headline" color="primary">
                    Your Reservation
                  </Typography>
                  <EditReservation currentRes={currentRes} />
                </Fragment>
              ) : (
                <Typography variant="headline" color="primary">
                  <NewReservation location={this.props.location} />
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>

        <Paper style={{marginRight: 10, marginLeft: 10}}>
          <Tabs
            value={this.state.value}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Price" />
            <Tab label="Date" />
            <Tab label="Time" />
          </Tabs>
        </Paper>
      </>
    )
  }
}

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
