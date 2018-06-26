import React, {Component} from 'react'
import NumberFormat from 'react-number-format'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import {NewReservationStyle} from './style'
import {connect} from 'react-redux'
import {logout} from '../store'
import Payment from './payment'

function NumberFormatCustom(props) {
  const {inputRef, onChange, ...other} = props

  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        })
      }}
      thousandSeparator
      prefix="$"
    />
  )
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

class NewReservation extends Component {
  constructor() {
    super()
    this.state = {
      date: '2018-06-26',
      time: '07:30',
      price: '20'
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
  }
  render() {
    const {classes} = this.props
    const {price, date, time} = this.state
    return (
      <div className="max-width-2 mx-auto">
        <div className="py2">
          <Typography variant="headline" component="h3">
            Make a new reservation
          </Typography>
          <Typography component="p">
            Current location and estimated wait placeholder
          </Typography>
        </div>
        <div className="pb2">
          <Paper className={classes.root} elevation={1}>
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
                  InputProps={{
                    inputComponent: NumberFormatCustom
                  }}
                />
              </div>
            </form>
          </Paper>
        </div>
        <div className="center">
          <Payment price={this.state.price} />
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    tbd: 'tbd'
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick: evt => {
      evt.preventDefault()
      dispatch(logout())
    }
  }
}

export default withStyles(NewReservationStyle)(
  connect(mapState, mapDispatch)(NewReservation)
)

/**
 * PROP TYPES
 */
NewReservation.propTypes = {
  // handleClick: PropTypes.func.isRequired,
  // isLoggedIn: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
}
