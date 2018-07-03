import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'

import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {LocationStyles} from './style'
import {editReservation} from '../store/reservation'

class EditReservation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: this.props.currentRes.date,
      time: this.props.currentRes.time,
      price: this.props.currentRes.price
    }
  }

  setTimeDate = () => {
    var today = new Date()
    var dd = today.getDate()
    var mm = today.getMonth() + 1 //January is 0!
    var yyyy = today.getFullYear()
    var hour = today.getHours()

    if (dd < 10) {
      dd = '0' + dd
    }

    if (mm < 10) {
      mm = '0' + mm
    }

    if (hour < 10) {
      hour = '0' + hour
    }

    this.setState({
      date: yyyy + '-' + mm + '-' + dd,
      time: hour + ':00'
    })
  }

  componentDidMount() {
    this.setTimeDate()
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    const id = this.props.currentRes.id
    const price = Number(this.state.price)
    const date = this.state.date
    const time = this.state.time
    const updateObj = {id, price, date, time}
    console.log('this is the current object', updateObj)
    await this.props.editReservation(updateObj)
  }

  render() {
    const {classes} = this.props
    const {price, date, time} = this.state

    return (
      <Fragment>
        <Paper>
          <form
            className={classes.container}
            noValidate
            onSubmit={this.handleSubmit}
          >
            <div className="block">
              <TextField
                id="date"
                label="Reservation Date"
                type="date"
                value={date}
                onChange={this.handleChange('date')}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </div>
            <div className="block">
              <TextField
                id="time"
                label="Reservation Time"
                type="time"
                value={time}
                onChange={this.handleChange('time')}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
                inputProps={{
                  step: 300 // 5 min
                }}
              />
            </div>
            <div className="block">
              <TextField
                className={classes.formControl}
                label="Reservation Price"
                value={price}
                onChange={this.handleChange('price')}
                id="price"
              />
            </div>
          </form>
        </Paper>
        <Button
          style={{marginTop: 20}}
          onClick={this.handleSubmit}
          variant="contained"
          className={classes.button}
          color="primary"
          size="small"
        >
          Edit Price
        </Button>
      </Fragment>
    )
  }
}

/**
 * CONTAINER
 */

const mapDispatchToProps = dispatch => ({
  editReservation: updateObj => dispatch(editReservation(updateObj))
})

export default withStyles(LocationStyles)(
  connect(null, mapDispatchToProps)(EditReservation)
)

/**
 * PROP TYPES
 */
EditReservation.propTypes = {
  // handleClick: PropTypes.func.isRequired,
  // isLoggedIn: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
}
