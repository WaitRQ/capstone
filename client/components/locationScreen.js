import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import history from '../history'
import {withStyles} from '@material-ui/core/styles'

import EditReservation from './editReservation'
import NewReservation from './newReservation'
import Header from './header'

import EditIcon from '@material-ui/icons/Edit'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import {LocationStyles} from './style'
import Avatar from '@material-ui/core/Avatar'

import Typography from '@material-ui/core/Typography'

import Button from '@material-ui/core/Button'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Divider from '@material-ui/core/Divider'

class LocationScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      currentRes: {}
    }
  }

  handleClickEdit = currentRes => {
    console.log('this is currentRes', currentRes)
    this.setState({
      currentRes: currentRes
    })
  }
  handleTabChange = (event, value) => {
    this.setState({value})
  }
  resetCurrentRes = () => {
    console.log('in reset')
    this.setState({
      currentRes: {}
    })
  }

  render() {
    console.log('this is all reservations', this.props.allReservations)
    var openReservations = this.props.allReservations.filter(reservation => {
      return (
        reservation.locationId === this.props.location.id &&
        reservation.status.type === 'open'
      )
    })
    console.log('this is all reservations', openReservations)
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

    const {classes} = this.props
    console.log('this is state', this.state.currentRes)

    return (
      <>
        <Header location={this.props.location} />

        <Grid container>
          <Grid item sm={7}>
            <Paper className={classes.leftPaperGrid}>
              {openReservations.map(item => {
                console.log('this is item_____________', item)
                if (this.props.user.id === item.buyerId) {
                  editable = true
                } else {
                  editable = false
                }
                return (
                  <Fragment key={item.id}>
                    <Typography
                      style={{marginTop: 10}}
                      variant="headline"
                      color="primary"
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src={item.buyer.imageUrl}
                        className={classes.avatar}
                      />
                      Price: ${item.price}
                      <Button
                        variant="contained"
                        onClick={() => {
                          history.push(`/timeline/${item.id}`)
                        }}
                        style={{float: 'right'}}
                        size="small"
                        color="primary"
                        className={classes.button}
                      >
                        Reserve
                      </Button>
                    </Typography>

                    <List className={classes.list} component="ul">
                      <ListItem button>
                        <ListItemText primary={`Time: ${item.time}`} />
                      </ListItem>
                      <ListItem button component="a" href="#simple-list">
                        <ListItemText primary={`Date: ${item.date}`} />
                        {editable ? (
                          <EditIcon
                            onClick={() => {
                              this.handleClickEdit(item)
                            }}
                          />
                        ) : (
                          ''
                        )}
                      </ListItem>
                    </List>
                    <Divider />
                  </Fragment>
                )
              })}
            </Paper>
          </Grid>

          <Grid item sm={5}>
            <Paper className={classes.upperRightPaperGrid}>
              <NewReservation location={this.props.location} />
            </Paper>

            <Paper className={classes.lowerRightPaperGrid}>
              {this.state.currentRes.id && (
                <Fragment>
                  <Typography variant="title" color="primary">
                    Your Reservation
                  </Typography>
                  <EditReservation
                    reset={this.resetCurrentRes}
                    currentRes={this.state.currentRes}
                  />
                </Fragment>
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
  allReservations: state.reservation,

  user: state.user
})

export default connect(mapStateToProps, null)(
  withStyles(LocationStyles)(LocationScreen)
)

LocationScreen.propTypes = {
  classes: PropTypes.object.isRequired
}
